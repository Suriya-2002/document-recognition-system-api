import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from './../models/user.js';
import { BCRYPT_SALT_NUMBER, JWT_SECRET_KEY, JWT_EXPIRATION_TIME } from './../utilities/constants.js';

export const postLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const [validationError] = errors.array();
            const validationErrorFields = errors.array().map(error => error.param);

            const error = new Error(validationError.msg);
            error.statusCode = 401;
            error.validationErrorFields = validationErrorFields;

            throw error;
        }

        const { email } = req.body;

        const user = await User.findUserByEmail(email);

        const payload = { userID: user._id, email: user.email };
        const token = JWT.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });

        res.json({ message: 'Logged in successfully', userID: user._id, token });
    } catch (error) {
        return next(error);
    }
};

export const postSignUp = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const [validationError] = errors.array();
            const validationErrorFields = errors.array().map(error => error.param);

            const error = new Error(validationError.msg);
            error.statusCode = 422;
            error.validationErrorFields = validationErrorFields;

            throw error;
        }

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_NUMBER);

        const user = new User(name, email, hashedPassword);
        await user.save();

        const payload = { userID: user._id, email: user.email };
        const token = JWT.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });

        res.status(201).json({ message: 'User created successfully', user: payload, token });
    } catch (error) {
        return next(error);
    }
};
