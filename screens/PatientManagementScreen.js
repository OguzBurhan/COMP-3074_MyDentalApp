import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PatientProfilePage = () => {
  // Sample patient data - in a real app, this would come from a database or state management
  const patientInfo = {
    name: "John Doe",
    age: 29,
    gender: "Male",
    medicalHistory: "No prior major illnesses.",
    // Add more patient details as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Profile</Text>
      <Text style={styles.info}>Name: {patientInfo.name}</Text>
      <Text style={styles.info}>Age: {patientInfo.age}</Text>
      <Text style={styles.info}>Gender: {patientInfo.gender}</Text>
      <Text style={styles.info}>
        Medical History: {patientInfo.medicalHistory}
      </Text>
      {/* Render more patient details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    // Add more styling as needed
  },
  // Additional styles can be added here
});

export default PatientProfilePage;
