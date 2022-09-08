import JWT from 'jsonwebtoken';
import { deleteImage, deleteDocument } from '../utilities/helper-functions.js';

import User from './../models/user.js';
import { JWT_SECRET_KEY } from './../utilities/constants.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const error = new Error('Not authenticated');
        error.statusCode = 401;

        const authenticationHeader = req.get('Authorization');
        if (!authenticationHeader) throw error;

        const [, token] = authenticationHeader.split(' ');
        const verifiedToken = JWT.verify(token, JWT_SECRET_KEY);

        if (!verifiedToken) throw error;

        const { userID } = verifiedToken;

        const user = await User.findUserByID(userID);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        next();
    } catch (error) {
        const images = req.files?.image;
        const documents = req.files?.document;

        if (images) deleteImage(images[0].filename);
        if (documents) deleteDocument(documents[0].filename);

        return next(error);
    }
};

export const autoAuthenticate = async (req, res, next) => {
    try {
        const authenticationHeader = req.get('Authorization');
        if (!authenticationHeader) return next();

        const [, token] = authenticationHeader.split(' ');
        const verifiedToken = JWT.verify(token, JWT_SECRET_KEY);

        if (!verifiedToken) return next();

        const { userID } = verifiedToken;

        const user = await User.findUserByID(userID);
        if (!user) return next();

        const { name, email, password } = user;
        req.user = new User(name, email, password, userID);

        next();
    } catch (error) {
        return next(error);
    }
};
