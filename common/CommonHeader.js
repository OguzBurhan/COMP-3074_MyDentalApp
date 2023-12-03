import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';

const CommonHeader = ({ navigation }) => {
  const handleLogout = () => {
    // Logout
    LoginService.logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // Styling for the header
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#f5f5f5', // Customize as needed
  },
  logoutText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default CommonHeader;
