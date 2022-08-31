import mongodb from 'mongodb';

import { DATABASE_URL } from './constants.js';

let database;

export const connectDatabase = async callback => {
    try {
        const client = await mongodb.MongoClient.connect(DATABASE_URL);
        database = client.db();

        console.log('Connected to Database!');
        callback();
    } catch (error) {
        console.log(error);
    }
};

export const getDatabase = () => {
    if (database) return database;
    throw 'No database found!';
};
