import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class MainMenuScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PatientManagement")}
          style={[styles.button, styles.buttonPatient]}
        >
          <Icon name="user-md" size={25} color="#fff" />
          <Text style={styles.buttonText}>Patient Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Appointments")}
          style={[styles.button, styles.buttonAppointment]}
        >
          <Icon name="calendar" size={25} color="#fff" />
          <Text style={styles.buttonText}>Appointment Scheduling</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={[styles.button, styles.buttonSettings]}
        >
          <Icon name="cog" size={25} color="#fff" />
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
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 280,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPatient: {
    backgroundColor: "#5cb85c", // Green color
  },
  buttonAppointment: {
    backgroundColor: "#f0ad4e", // Orange color
  },
  buttonSettings: {
    backgroundColor: "#d9534f", // Red color
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default MainMenuScreen;
