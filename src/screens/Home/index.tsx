import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MenuItem as DatabaseMenuItem, useMenuItemsDatabase } from "../../database/useMenuItemsDatabase";

type MenuItemDetailsParams = {
  item: DatabaseMenuItem;
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { menuItems, fetchMenuItems } = useMenuItemsDatabase();
  const [searchQuery, setSearchQuery] = React.useState("");

  useFocusEffect(
    useCallback(() => {
      fetchMenuItems();
    }, [fetchMenuItems])
  );

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item: DatabaseMenuItem) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [menuItems, searchQuery]);

  const renderItem = ({ item }: { item: DatabaseMenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() =>
        navigation.navigate("MenuItemDetails" as never, { item } as MenuItemDetailsParams as never)
      }
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <Text style={styles.menuItemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Little Lemon</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Feather name="search" size={24} color="black" />
      </View>
      <FlatList
        data={filteredMenuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || "unknown"}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f8f8f8",
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  menuList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  menuItemName: {
    fontSize: 18,
  },
});

export default Home;