import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const ROOT_DIRECTORY = dirname(join(fileURLToPath(import.meta.url), '..'));
