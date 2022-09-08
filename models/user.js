import { ObjectId } from 'mongodb';

import { getDatabase } from './../utilities/database.js';

export default class User {
    constructor(name, email, password, ID = null) {
        this._id = ID ? new ObjectId(ID) : null;
        this.name = name;
        this.email = email;
        this.password = password;
        this.files = [];
    }

    async save() {
        try {
            const database = getDatabase();
            return database.collection('users').insertOne(this);
        } catch (error) {
            throw error;
        }
    }

    async addImage(fileName) {
        try {
            const database = getDatabase();
            const newImage = {
                fileName,
                type: 'image',
                uploadedAt: new Date(),
            };

            return database
                .collection('users')
                .updateOne({ _id: new ObjectId(this._id) }, { $push: { files: newImage } });
        } catch (error) {
            throw error;
        }
    }

    async addDocument(fileName) {
        try {
            const database = getDatabase();
            const newDocument = {
                fileName,
                type: 'document',
                uploadedAt: new Date(),
            };

            return database
                .collection('users')
                .updateOne({ _id: new ObjectId(this._id) }, { $push: { files: newDocument } });
        } catch (error) {
            throw error;
        }
    }

    async fetchFiles() {
        try {
            const database = getDatabase();
            return database
                .collection('users')
                .findOne({ _id: new ObjectId(this._id) }, { projection: { _id: 0, files: 1 } });
        } catch (error) {
            throw error;
        }
    }

    static async findUserByID(userID) {
        try {
            const database = getDatabase();
            return database.collection('users').findOne({ _id: new ObjectId(userID) });
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
