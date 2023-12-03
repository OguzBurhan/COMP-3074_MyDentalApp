import md5 from "crypto-js/md5";
import UserService from "./UserService"; // Import UserService
import DatabaseService from "./DatabaseService";

const LoginService = {
    /**
     * Check the login of the user
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Boolean}
     */
    async login(username, password) {
        try {
            // Get the user table from local storage
            const users = await DatabaseService.getUserTable();

            // Check if the username exists in the users object
            if (!users.hasOwnProperty(username)) {
                return false;
            }

            // Compute the MD5 hash of the provided password
            const hashedPassword = md5(password).toString();

            // Compare the hashed password with the stored password hash
            if (users[username].password === hashedPassword) {
                // Store the user data using UserService
                await UserService.storeCurrentUserData(users[username]);

                return true; // Successful login
            } else {
                return false; // Password does not match
            }

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    /**
     * Any cleanup needed when logging out
     * 
     * @returns {Boolean}
     */
     async logout() {
        try {
            // Clear the stored userdata about the current user
            UserService.clearCurrentUserData();

            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    /**
     * Registers a new user
     * 
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @returns 
     */
    async registerUser(username, password, email) {
        try {
            // Get the user table from local storage
            const users = await DatabaseService.getUserTable();

            // Check if the username or email already exists
            for (let user in users) {
                if (user === username || users[user].email === email) {
                    return false; // User already exists
                }
            }

            // Hash the password
            const hashedPassword = md5(password).toString();

            // Create new user object
            const newUser = {
                username: username,
                email: email,
                password: hashedPassword,
                creationDate: new Date().toISOString()
            };

            // Call DatabaseService to add new user
            await DatabaseService.createUserEntry(newUser);

            return true;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}

export default LoginService;
