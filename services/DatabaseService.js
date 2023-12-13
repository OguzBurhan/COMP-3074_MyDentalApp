import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from './UserService';

const USERS_TABLE = 'USERS_TABLE';
const APPOINTMENTS_TABLE = 'APPOINTMENTS_TABLE';

/*

Database Mapping Example:

USERS_TABLE:
{
    username1: {
        username: username1,
        email: username1@gmail.com,
        password: hashedPassword1,
        creationDate: "11/11/1990"
    },
    username2: {
        username: username2,
        email: username2@gmail.com,
        password: hashedPassword2,
        creationDate: "2/2/1934"
    },
    ...other users...
}

APPOINTMENTS_TABLE:
{
    username1: [
        { 
            selectedDate: "2/4/2023",
            doctor: 'John Wick',
            time: '12:25',
            operation: 'Dental Checkup'
        },
        { 
            selectedDate: "2/8/2023",
            doctor: 'Amy Wick',
            time: '17:00',
            operation: 'Crown Replacement'
        }
    ],
   username2: []
}


*/

const DatabaseService = {

    /**
     * Gets the user table from local storage
     * @returns {Object}
     */
     async getUserTable() {
        try {
            const usersJSON = await AsyncStorage.getItem(USERS_TABLE);
            return usersJSON ? JSON.parse(usersJSON) : {};
        } catch (error) {
            console.error('Error retrieving users from AsyncStorage:', error);
            throw error; // or handle it as needed
        }
    },

     /**
     * Gets the appointments table from local storage
     * @returns {Object}
     */
      async getAppointmentsTable() {
        try {
            const appointmentsJSON = await AsyncStorage.getItem(APPOINTMENTS_TABLE);
            return appointmentsJSON ? JSON.parse(appointmentsJSON) : {};
        } catch (error) {
            console.error('Error retrieving appointments from AsyncStorage:', error);
            throw error; // or handle it as needed
        }
    },

    /**
     * Creates a user in local storage with the new user entry
     * 
     * @param {Object} userObject 
     */
    async createUserEntry(userObject) {
        try {
            // Retrieve the existing users from AsyncStorage
            const usersJSON = await AsyncStorage.getItem(USERS_TABLE);
            const users = usersJSON ? JSON.parse(usersJSON) : {};

            // Add the new user to the users object
            users[userObject.username] = userObject;

            // Save the updated users back to AsyncStorage
            await AsyncStorage.setItem(USERS_TABLE, JSON.stringify(users));

            console.log('User entry created and stored in AsyncStorage.');
        } catch (error) {
            console.error('Error creating users in AsyncStorage:', error);
            throw error; // or handle it as needed
        }
    },

    /**
     * Creates an appointment in local storage with the new user entry
     * 
     * @param {Object} appointmentObject 
     */
     async createAppointmentsEntry(username, appointmentObject) {
        try {
            // Retrieve the existing appointments from AsyncStorage
            const appointmentsJSON = await AsyncStorage.getItem(APPOINTMENTS_TABLE);
            const appointments = appointmentsJSON ? JSON.parse(appointmentsJSON) : {};

            // If the user doesn't have an existing appointments array, create it
            if (!appointments[username]) {
                appointments[username] = [];
            }

            // Add the new appointment to the user's array of appointments
            appointments[username].push(appointmentObject);

            // Save the updated appointments back to AsyncStorage
            await AsyncStorage.setItem(APPOINTMENTS_TABLE, JSON.stringify(appointments));

            console.log('Appointment entry created and stored in AsyncStorage.');
        } catch (error) {
            console.error('Error creating appointments in AsyncStorage:', error);
            throw error; // or handle it as needed
        }
    },


    /**
     * Updates a user's credentials in local storage.
     * 
     * @param {string} username - The username of the user to update.
     * @param {Object} updatedCredentials - The updated credentials of the user.
     */
     async updateUserCredentials(username, updatedCredentials) {
        try {
            // Retrieve the existing users from AsyncStorage
            const usersJSON = await AsyncStorage.getItem(USERS_TABLE);
            const users = usersJSON ? JSON.parse(usersJSON) : {};

            // Check if the user exists
            if (!users[username]) {
                throw new Error('User not found');
            }

            // Update the user's credentials
            users[username] = { ...users[username], ...updatedCredentials };

            // Save the updated users back to AsyncStorage
            await AsyncStorage.setItem(USERS_TABLE, JSON.stringify(users));

            console.log('User credentials updated in AsyncStorage.');
        } catch (error) {
            console.error('Error updating user credentials in AsyncStorage:', error);
            throw error; // or handle it as needed
        }
    },



}

export default DatabaseService;
