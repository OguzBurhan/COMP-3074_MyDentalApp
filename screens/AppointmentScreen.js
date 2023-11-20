import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';


const AppointmentScreen = () => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');
  const [operation, setOperation] = useState('');
  const [appointments, setAppointments] = useState([]);
  
  const handleDayPress = (day) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const bookAppointment = () => {
    const newAppointment = { selectedDate, doctor, time, operation };
  
    // This line adds the new appointment to the state array 'appointments'
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  
    // Close the modal and optionally reset form fields
    setModalVisible(false);
    setDoctor('');
    setTime('');
    setOperation('');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Calendar</Text>
      <Calendar
        // Initially visible month. Default = now
        current={'2023-11-01'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={handleDayPress}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => console.log('selected day', day)}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => console.log('month changed', month)}
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
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
        // markedDates={markedDates}
        
      />
            <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Book Appointment for {selectedDate}</Text>
          <TextInput
            style={styles.input}
            placeholder="Doctor"
            value={doctor}
            onChangeText={setDoctor}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={time}
            onChangeText={setTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Operation"
            value={operation}
            onChangeText={setOperation}
          />
          <TouchableOpacity style={styles.button} onPress={bookAppointment}>
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.appointmentsContainer}>
      {appointments.map((appointment, index) => (
        <View key={index} style={styles.appointmentItem}>
          <Text style={styles.appointmentText}>Date: {appointment.selectedDate}</Text>
          <Text style={styles.appointmentText}>Doctor: {appointment.doctor}</Text>
          <Text style={styles.appointmentText}>Time: {appointment.time}</Text>
          <Text style={styles.appointmentText}>Operation: {appointment.operation}</Text>
        </View>
      ))}
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  appointmentsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  appointmentItem: {
    backgroundColor: '#eef',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default AppointmentScreen;