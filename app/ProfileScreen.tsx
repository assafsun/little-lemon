import React from 'react';
import { Button, Image, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Added a placeholder avatar image to the profile screen */}
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/images/android-icon-foreground.png')} style={styles.avatarImage} />
      </View>

      {/* Personal Information Section */}
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Last Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />

      {/* Email Notifications Section */}
      <Text style={styles.sectionTitle}>Email Notifications</Text>
      <View style={styles.switchRow}>
        <Text>Order Statuses</Text>
        <Switch value={true} onValueChange={() => {}} />
      </View>
      <View style={styles.switchRow}>
        <Text>Password Changes</Text>
        <Switch value={false} onValueChange={() => {}} />
      </View>
      <View style={styles.switchRow}>
        <Text>Special Offers</Text>
        <Switch value={true} onValueChange={() => {}} />
      </View>
      <View style={styles.switchRow}>
        <Text>Newsletter</Text>
        <Switch value={false} onValueChange={() => {}} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Discard Changes" onPress={() => {}} />
        <Button title="Save Changes" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProfileScreen;