// Author: Assaf
import React, { useState } from "react";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";

const menuData = [
  { title: "Appetizers", data: ["Hummus", "Moutabal", "Falafel", "Marinated Olives", "Kofta", "Eggplant Salad"] },
  { title: "Main Dishes", data: ["Lentil Burger", "Smoked Salmon", "Kofta Burger", "Turkish Kebab"] },
  { title: "Sides", data: ["Fries", "Buttered Rice", "Bread Sticks", "Pita Pocket", "Lentil Soup", "Greek Salad", "Rice Pilaf"] },
  { title: "Desserts", data: ["Baklava", "Tartufo", "Tiramisu", "Panna Cotta"] },
];

const Separator = () => <View style={styles.separator} />;
const Footer = () => <Text style={styles.footerText}>© Little Lemon, 2022</Text>;
const MenuItem = ({ name }: { name: string }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{name}</Text>
  </View>
);

const MenuItems = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      {!showMenu && (
        <Text style={styles.infoText}>
          Little Lemon is a charming neighborhood bistro that serves simple food
          and classic cocktails in a lively but casual environment. View our
          menu to explore our cuisine with daily specials!
        </Text>
      )}
      <Pressable style={styles.button} onPress={() => setShowMenu(!showMenu)}>
        <Text style={styles.buttonText}>{showMenu ? "Home" : "View Menu"}</Text>
      </Pressable>
      {showMenu && (
        <SectionList
          sections={menuData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <MenuItem name={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ListFooterComponent={Footer}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#333",
  },
  itemText: {
    fontSize: 18,
    color: "#F4CE14",
  },
  sectionHeader: {
    fontSize: 20,
    backgroundColor: "#fbdabb",
    color: "#333",
    textAlign: "center",
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#EDEFEE",
  },
  footerText: {
    fontSize: 14,
    color: "#EDEFEE",
    textAlign: "center",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#EDEFEE",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#EDEFEE",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default MenuItems;