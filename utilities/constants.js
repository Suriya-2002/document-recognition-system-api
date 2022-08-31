import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const databaseUsername = 'Suriya';
const databasePassword = 'MongoDBPassword';
const databaseName = 'document-recognition-system';

export const ROOT_DIRECTORY = dirname(join(fileURLToPath(import.meta.url), '..'));

export const DATABASE_URL = `mongodb+srv://${databaseUsername}:${databasePassword}@document-recognition-sy.ifz8kkg.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
