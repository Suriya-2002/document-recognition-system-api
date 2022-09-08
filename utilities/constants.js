import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const databaseUsername = 'Suriya';
const databasePassword = 'MongoDBPassword';
const databaseName = 'document-recognition-system';

export const ROOT_DIRECTORY = dirname(join(fileURLToPath(import.meta.url), '..'));

export const DATABASE_URL = `mongodb+srv://${databaseUsername}:${databasePassword}@document-recognition-sy.ifz8kkg.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

export const BCRYPT_SALT_NUMBER = 12;

export const JWT_SECRET_KEY = 'zSnAOxjKWwaONtcA54hr3B7ctmoBbFzv';
export const JWT_EXPIRATION_TIME = '1h';

export const DOCUMENT_MIMETYPE = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
