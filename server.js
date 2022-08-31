import { join } from 'path';

import express from 'express';

import { ROOT_DIRECTORY } from './utilities/constants.js';

const app = express();

app.use(express.json());
app.use(express.static(join(ROOT_DIRECTORY, 'public')));

app.listen(2002, 'localhost');
