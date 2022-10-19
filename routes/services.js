import { Router } from 'express';

import * as servicesController from './../controllers/services.js';
import { isAuthenticated } from './../middleware/authentication.js';

const router = Router();

router.get('/files', isAuthenticated, servicesController.getFiles);
router.get('/image/:imageID', isAuthenticated, servicesController.getImage);

router.post('/image', isAuthenticated, servicesController.postImage);
router.post('/document', isAuthenticated, servicesController.postDocument);
router.post('/process', isAuthenticated, servicesController.postProcess);

export default router;
