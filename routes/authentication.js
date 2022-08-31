import { Router } from 'express';

import * as authenticationController from './../controllers/authentication.js';

const router = Router();

router.post('/login');
router.post('/sign-up', authenticationController.postSignUp);

export default router;
