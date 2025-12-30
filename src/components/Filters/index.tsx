import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Filters = ({
    onChange,
    selections,
    sections,
}: {
    onChange: (index: number) => void;
    selections: boolean[];
    sections: string[];
}) => {
    const renderItem = ({ item, index }: { item: string; index: number }) => {
        return (
            <Pressable
                onPress={() => onChange(index)}
                style={[
                    styles.item,
                    {
                        backgroundColor: selections[index] ? "#EE9972" : "transparent",
                        marginRight: index === sections.length - 1 ? 0 : 8,
                    },
                ]}
                key={item}
            >
                <Text
                    style={[
                        styles.text,
                        {
                            color: selections[index] ? "black" : "white",
                        },
                    ]}
                >
                    {item}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.filtersContainer}>
            <FlatList
                data={sections}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 16,
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Filters;
