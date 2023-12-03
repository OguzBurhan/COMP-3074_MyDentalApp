import React from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoginService from "../services/LoginService";

class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  }

  update(o) {
    return new Promise((resolve) => {
      this.setState(o, resolve);
    });
  }

  handleRegistration = async () => {
    const { username, password, confirmPassword, email } = this.state;

    // Validate inputs
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const registrationSuccessful = await LoginService.registerUser(
        username,
        password,
        email
      );

      if (registrationSuccessful) {
        Alert.alert("Success", "Registration successful!");
        this.props.navigation.navigate("Login");
      } else {
        Alert.alert(
          "Error",
          "Registration failed. Username or email might already be in use."
        );
      }
    } catch (error) {
      Alert.alert("Registration Error", `An error occurred: ${error.message}`);
    }
  };

  handleEmailChange = (email) => {
    this.update({ email });
  };

  handleUsernameChange = (username) => {
    this.update({ username });
  };

  handlePasswordChange = (password) => {
    this.update({ password });
  };

  handleConfirmPasswordChange = (confirmPassword) => {
    this.update({ confirmPassword });
  };

  render() {
    const { navigation } = this.props;
    const { username, password, confirmPassword, email } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={this.handleEmailChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={this.handleUsernameChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={this.handleConfirmPasswordChange}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={this.handleRegistration}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#007bff",
    marginTop: 15,
  },
});

export default RegistrationScreen;
