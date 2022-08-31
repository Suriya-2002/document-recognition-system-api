import bcrypt from 'bcryptjs';

import User from './../models/user.js';

export const postSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User(name, email, hashedPassword);
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return next(error);
    }
};
