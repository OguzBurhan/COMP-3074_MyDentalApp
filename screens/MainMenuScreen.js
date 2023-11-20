import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const CustomButton = ({ title, onPress, iconName }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Icon name={iconName} size={20} color="white" />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);
const MainMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <CustomButton
        title="Patient Management"
        onPress={() => navigation.navigate('PatientManagement')}
        iconName="user-md"
      />

      <CustomButton
        title="Appointment Scheduling"
        onPress={() => navigation.navigate('Appointments')}
        iconName="calendar"
      />
      <CustomButton
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        iconName="cog"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // You can choose your color
  },
  button: {
    backgroundColor: '#007bff', // Primary color
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 250, // Set the width as needed
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainMenuScreen;
