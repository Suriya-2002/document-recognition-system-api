import { join } from 'path';

import express from 'express';
import multer from 'multer';
import { v4 as uniqueID } from 'uuid';

import authenticationRoutes from './routes/authentication.js';
import userRoutes from './routes/user.js';
import servicesRoutes from './routes/services.js';
import { autoAuthenticate } from './middleware/authentication.js';
import { CORSHeaders } from './middleware/utilities.js';
import { connectDatabase } from './utilities/database.js';
import { ROOT_DIRECTORY, DOCUMENT_MIMETYPE } from './utilities/constants.js';

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, join('public', `${file.fieldname}s`)),
    filename: (req, file, callback) => callback(null, `${uniqueID()}-${file.originalname}`),
});
const fileFilter = (req, file, callback) => {
    if (DOCUMENT_MIMETYPE.includes(file.mimetype)) return callback(null, true);

    return callback(null, false);
};

app.use(express.json());
app.use(express.static(join(ROOT_DIRECTORY, 'public')));
app.use(
    multer({ storage, fileFilter }).fields([
        { name: 'image', maxCount: 10 },
        { name: 'document', maxCount: 1 },
    ])
);

app.use(CORSHeaders);
app.use(autoAuthenticate);

app.use('/authentication', authenticationRoutes);
app.use('/user', userRoutes);
app.use('/services', servicesRoutes);

app.use((error, req, res, next) => {
    console.log(error);

    const { message, statusCode = 500 } = error;
    res.status(statusCode).json({ message, ...error });
});

connectDatabase(() => app.listen(2002, 'localhost'));
