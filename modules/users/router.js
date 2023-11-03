import express from 'express';
import controller from './controller.js';
import AdminController from '../users/adminController/controller.js';
import SuperAdminController from './superAdminController/controller.js';

import auth from '../../middleware/auth.js'
const router = express.Router()


router.post('/login', controller.login);
router.post('/super_create', controller.createSuper);

router.use(auth.verifikasiToken, auth.verifikasiAdmin)

//users


//admin
router.post('/user_create', AdminController.createUser);


//superuser


//superadmin
router.post('/admin_create', SuperAdminController.createAdmin);

export default router