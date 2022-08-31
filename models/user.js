import { getDatabase } from './../utilities/database.js';

export default class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save() {
        try {
            const database = getDatabase();
            return database.collection('users').insertOne(this);
        } catch (error) {
            throw error;
        }
    }

    static async findUserByEmail(email) {
        try {
            const database = getDatabase();
            return database.collection('users').findOne({ email });
        } catch (error) {
            throw error;
        }
    }
}
