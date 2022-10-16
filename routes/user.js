import { Router } from 'express';

import * as userController from './../controllers/user.js';
import { isAuthenticated } from './../middleware/authentication.js';

const router = Router();

router.get('/profile', isAuthenticated, userController.getProfile);

export default router;
