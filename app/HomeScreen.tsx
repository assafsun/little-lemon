import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image source={require('../assets/images/partial-react-logo.png')} style={styles.heroImage} />
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Your favorite food, delivered fast.</Text>
      </View>

      {/* Menu Breakdown */}
      <View style={styles.menuButtons}>
        <TouchableOpacity style={styles.menuButton}><Text>Starters</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}><Text>Mains</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}><Text>Desserts</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}><Text>Drinks</Text></TouchableOpacity>
      </View>

      {/* Food Menu List */}
      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Image source={require('../assets/images/icon.png')} style={styles.menuItemImage} />
          <View>
            <Text style={styles.menuItemTitle}>Dish Name</Text>
            <Text style={styles.menuItemDescription}>Delicious and freshly made.</Text>
            <Text style={styles.menuItemPrice}>$12.99</Text>
          </View>
        </View>
        {/* Add more menu items here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    alignItems: 'center',
    padding: 20,
  },
  heroImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  menuList: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  menuItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  menuItemPrice: {
    fontSize: 16,
    color: 'green',
  },
});

export default HomeScreen;