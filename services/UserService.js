import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_USER_DATA_KEY = "CURRENT_USER_DATA"

const UserService = {
    /**
     * Stores the user data in AsyncStorage
     * 
     * @param {Object} userData
     */
    async storeCurrentUserData(userData) {
        try {
            await AsyncStorage.setItem(CURRENT_USER_DATA_KEY, JSON.stringify(userData));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Clear the user data in AsyncStorage
     * 
     * @param {Object} userData
     */
     async clearCurrentUserData(userData) {
        try {
            await AsyncStorage.removeItem(CURRENT_USER_DATA_KEY);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Gets the user data from AsyncStorage
     */
    async getCurrentUserData() {
        try {
            const userData = await AsyncStorage.getItem(CURRENT_USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
