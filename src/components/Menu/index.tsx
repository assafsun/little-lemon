import { MenuItem, MenuItems, Response, SectionListData } from "@/src/types";

import Filters from "@/src/components/Filters";
import {
    createTable,
    filterByQueryAndCategories,
    getMenuItems,
    saveMenuItems,
} from "@/src/database/database";
import { getSectionListData, useUpdateEffect } from "@/src/utils";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Image, SectionList, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

const API_URL =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["starters", "mains", "desserts"];

const Item = ({ item }: { item: Omit<MenuItem, "category"> }) => (
    <View style={styles.item}>
        <View style={styles.itemBody}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </View>
        <Image
            style={styles.itemImage}
            source={{
                uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
            }}
        />
    </View>
);

export default function Menu() {
    const [data, setData] = useState<SectionListData>([]);
    const [searchBarText, setSearchBarText] = useState("");
    const [query, setQuery] = useState("");
    const [filterSelections, setFilterSelections] = useState(sections.map(() => false));

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);

            const responseJson: Response = await response.json();

            return responseJson.menu.map((item, index) => ({
                id: index,
                ...item,
                price: item.price.toString(),
                title: item.name,
            })) as MenuItems;
        } catch (e) {
            Alert.alert(e instanceof Error ? e.message : "Error fetching menu items");
            return [];
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await createTable();

                let menuItems = await getMenuItems();

                if (!menuItems?.length) {
                    menuItems = await fetchData();
                    await saveMenuItems(menuItems);
                }

                const sectionListData = getSectionListData(menuItems);

                setData(sectionListData);
            } catch (e) {
                Alert.alert(e instanceof Error ? e.message : "Error fetching menu items");
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            try {
                const menuItems = await filterByQueryAndCategories(query, activeCategories);
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(e instanceof Error ? e.message : "Error filtering menu items");
            }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((queryString: string) => {
        setQuery(queryString);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text: string) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index: number) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    return (
        <>
            <Searchbar
                placeholder="Search"
                placeholderTextColor="white"
                onChangeText={handleSearchChange}
                value={searchBarText}
                style={styles.searchBar}
                iconColor="white"
                inputStyle={{ color: "white" }}
                elevation={0}
            />
            <Filters
                selections={filterSelections}
                onChange={handleFiltersChange}
                sections={sections}
            />
            <SectionList
                style={styles.sectionList}
                sections={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Item item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    sectionList: {
        paddingHorizontal: 16,
    },
    searchBar: {
        marginBottom: 24,
        backgroundColor: "#495E57",
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        paddingVertical: 10,
    },
    itemBody: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        color: "#ffffff",
        paddingBottom: 5,
    },
    description: {
        color: "#ffffff",
        paddingRight: 5,
    },
    price: {
        fontSize: 20,
        color: "#EE9972",
        paddingTop: 5,
    },
    itemImage: {
        width: 100,
        height: 100,
    },
    header: {
        fontSize: 24,
        paddingVertical: 8,
        color: "#FBDABB",
        backgroundColor: "#495E57",
    },
    title: {
        fontSize: 20,
        color: "white",
    },
});
