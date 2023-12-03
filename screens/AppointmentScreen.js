import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AppointmentService from "../services/AppointmentService";
import CommonHeader from "../common/CommonHeader";
import RNPickerSelect from 'react-native-picker-select';

export default class AppointmentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      selectedDate: "",
      doctor: "",
      time: "",
      operation: "",
      appointments: [],
      doctorsList: ['Doctor A', 'Doctor B', 'Doctor C'], 
      operationsList: ['Operation X', 'Operation Y', 'Operation Z'], 
      timesList: [
        '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM',
        '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM',
        '5:00 PM', '5:30 PM',
        '6:00 PM'
      ],
    };
  }

  async componentDidMount() {
    // Fetch the data
    await this.fetchAppointments();
  }

  update(o) {
    return new Promise((resolve) => {
      this.setState(o, resolve);
    });
  }

  fetchAppointments = async () => {
    let appointments = await AppointmentService.getCurrentUsersAppointments();
    await this.update({ appointments });
  };

  handleDayPress = (day) => {
    console.log("selected day", day);
    this.update({ selectedDate: day.dateString });
    this.update({ isModalVisible: true });
  };

  bookAppointment = async () => {
    let { selectedDate, doctor, time, operation } = this.state;

    const newAppointment = { selectedDate, doctor, time, operation };

    await AppointmentService.createAppointmentForCurrentUser(newAppointment);

    // Close the modal and optionally reset form fields
    await this.update({
      isModalVisible: false,
      doctor: "",
      time: "",
      operation: "",
    });

    // Get the new data
    await this.fetchAppointments();
  };

  render() {
    let {
      isModalVisible,
      doctor,
      time,
      operation,
      selectedDate,
      appointments,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <CommonHeader navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.title}>Appointment Calendar</Text>
          <Calendar
            // Initially visible month. Default = now
            current={"2023-11-01"}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={this.handleDayPress}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => console.log("selected day", day)}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"yyyy MM"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => console.log("month changed", month)}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Default = 0
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            theme={{
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "orange",
              monthTextColor: "blue",
              indicatorColor: "blue",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            // markedDates={markedDates}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => this.update({ isModalVisible: false })}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Book Appointment for {selectedDate}
              </Text>
              <RNPickerSelect
                onValueChange={(value) => this.update({ doctor: value })}
                items={this.state.doctorsList.map((doctor) => ({ label: doctor, value: doctor }))}
                placeholder={{ label: 'Select a Doctor', value: null }}
                style={pickerSelectStyles}
                value={this.state.doctor}
              />

              <RNPickerSelect
                onValueChange={(value) => this.update({ time: value })}
                items={this.state.timesList.map((time) => ({ label: time, value: time }))}
                placeholder={{ label: 'Select a Time', value: null }}
                style={pickerSelectStyles}
                value={this.state.time}
              />

              <RNPickerSelect
                onValueChange={(value) => this.update({ operation: value })}
                items={this.state.operationsList.map((operation) => ({ label: operation, value: operation }))}
                placeholder={{ label: 'Select an Operation', value: null }}
                style={pickerSelectStyles}
                value={this.state.operation}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={this.bookAppointment}
              >
                <Text style={styles.buttonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.appointmentsContainer}>
            {appointments.map((appointment, index) => (
              <View key={index} style={styles.appointmentItem}>
                <Text style={styles.appointmentText}>
                  Date: {appointment.selectedDate}
                </Text>
                <Text style={styles.appointmentText}>
                  Doctor: {appointment.doctor}
                </Text>
                <Text style={styles.appointmentText}>
                  Time: {appointment.time}
                </Text>
                <Text style={styles.appointmentText}>
                  Operation: {appointment.operation}
                </Text>
              </View>
            ))}
          </View>
        </View>
        </View>
    );
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  appointmentsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  appointmentItem: {
    backgroundColor: "#eef",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
