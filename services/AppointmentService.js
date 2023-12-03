import DatabaseService from "./DatabaseService";
import UserService from "./UserService"; 

const AppointmentService = {

    /**
     * Gets all appointments of the current user
     * @returns {Array}
     */
    async getCurrentUsersAppointments() {
        try {
            // Get the current user's data
            const currentUserData = await UserService.getCurrentUserData();
            const username = currentUserData.username;

            // Get all appointments from the database
            const allAppointments = await DatabaseService.getAppointmentsTable();

            // Retrieve appointments specific to the current user, or empty array if nothing exists
            const userAppointments = allAppointments[username] || [];

            return userAppointments;
        } catch (error) {
            console.error('Error retrieving appointments from AsyncStorage:', error);
            throw error; // or handle it as needed
        }
    },

    /**
     * Creates an appointment entry for the current user
     * 
     * @param {Object} appointmentObject 
     * @returns {Boolean}
     */
    async createAppointmentForCurrentUser(appointmentObject){
        try {
            // Get the current user's data
            const currentUserData = await UserService.getCurrentUserData();
            const username = currentUserData.username;

            await DatabaseService.createAppointmentsEntry(username, appointmentObject);

            return true;
        } catch (error){
            console.error('Error creating appointment for current user:', error);
            throw error;
        }
    }
}

export default AppointmentService;
