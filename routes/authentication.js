import { Router } from 'express';

import * as authenticationController from './../controllers/authentication.js';
import { loginValidation, signUpValidation } from './../middleware/validation.js';

const router = Router();

router.post('/login', loginValidation, authenticationController.postLogin);
router.post('/sign-up', signUpValidation, authenticationController.postSignUp);

export default router;
