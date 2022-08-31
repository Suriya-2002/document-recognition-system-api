import bcrypt from 'bcryptjs';
import { body } from 'express-validator';

import User from './../models/user.js';

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Invalid E-Mail Address')
        .custom(async value => {
            const user = await User.findUserByEmail(value);
            if (!user) throw new Error('E-Mail does not exists');

            return true;
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
        .isAlphanumeric()
        .withMessage('Password must only contain alphanumeric characters')
        .custom(async (value, { req }) => {
            const { email } = req.body;

            const user = await User.findUserByEmail(email);
            const isCorrectPassword = await bcrypt.compare(value, user.password);

            if (!isCorrectPassword) throw new Error('Incorrect Password');

            return true;
        }),
];

export const signUpValidation = [
    body('name').trim().isLength({ min: 1 }).withMessage('Invalid name'),
    body('email')
        .isEmail()
        .withMessage('Invalid E-Mail Address')
        .custom(async value => {
            const existingUser = await User.findUserByEmail(value);
            if (existingUser) throw new Error('E-Mail already exists');

            return true;
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
        .isAlphanumeric()
        .withMessage('Password must only contain alphanumeric characters'),
    body('confirmPassword').custom((value, { req }) => {
        const { password } = req.body;
        if (value !== password) throw new Error('Passwords do not match');

        return true;
    }),
];
