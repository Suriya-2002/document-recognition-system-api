import { Router } from 'express';

import * as servicesController from './../controllers/services.js';
import { isAuthenticated } from './../middleware/authentication.js';

const router = Router();

router.post('/image', isAuthenticated, servicesController.postImage);

export default router;
