import { promises } from 'fs';
import { join } from 'path';

import { ROOT_DIRECTORY } from './constants.js';

export const deleteImage = image => {
    promises.unlink(join(ROOT_DIRECTORY, 'public', 'images', image));
};

export const deleteDocument = document => {
    promises.unlink(join(ROOT_DIRECTORY, 'public', 'documents', document));
};
