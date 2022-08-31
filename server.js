import { join } from 'path';

import express from 'express';

import authenticationRoutes from './routes/authentication.js';
import { connectDatabase } from './utilities/database.js';
import { ROOT_DIRECTORY } from './utilities/constants.js';

const app = express();

app.use(express.json());
app.use(express.static(join(ROOT_DIRECTORY, 'public')));

app.use('/authentication', authenticationRoutes);

app.use((error, req, res, next) => {
    console.log(error);

    const { message, statusCode = 500 } = error;
    res.status(statusCode).json({ message, ...error });
});

connectDatabase(() => app.listen(2002, 'localhost'));
