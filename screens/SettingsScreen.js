import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import DatabaseService from '../services/DatabaseService'; // Import DatabaseService

const SettingsScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const updateCredentials = async () => {
    try {
      // Update user credentials using DatabaseService
      await DatabaseService.updateUserCredentials(username, { email });
      Alert.alert("Success", "Credentials Updated Successfully");
    } catch (error) {
      // Handle any errors here
      Alert.alert("Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Update Credentials</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter new email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={updateCredentials}>
          <Text style={styles.buttonText}>Update Credentials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Details")}>
          <Text style={styles.buttonText}>Go to Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f4f4f4', // Added a subtle background color
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '90%', // Adjusted width
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white', // Added a background color to input
  },
  button: {
    width: '90%', // Adjusted width
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#007bff', // A more vibrant button color
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
