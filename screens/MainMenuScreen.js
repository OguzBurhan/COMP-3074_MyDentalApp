import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

class MainMenuScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("PatientManagement")} style={styles.button}>
          <Icon name="user-md" size={20} color="white" />
          <Text style={styles.buttonText}>Patient Management</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Appointments")} style={styles.button}>
          <Icon name="calendar" size={20} color="white" />
          <Text style={styles.buttonText}>Appointment Scheduling</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.button}>
          <Icon name="cog" size={20} color="white" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 250,
    alignItems: "center",
    flexDirection: "row", // Align icon and text horizontally
    justifyContent: "center" // Center icon and text within the button
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10, // Add space between the icon and text
  },
});

export default MainMenuScreen;
