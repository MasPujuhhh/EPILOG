import express from 'express';
import controller from './controller.js';

import auth from '../../middleware/auth.js'
const router = express.Router()


router.post('/login', controller.login);
router.post('/super_create', controller.createSuper);

//users
router.use(auth.verifikasiToken)
router.get('/user/all', controller.getDataUser)
router.get('/user', controller.getDataUserById)             //user
router.post('/user', controller.createUser)
router.post('/admin', controller.createAdmin)
router.post('/super', controller.createSuper)
router.put('/user/exp', controller.updateExpiredUser)
router.put('/user/pass', controller.editUserPassword)
router.put('/user/:id', controller.editUserById)                //user
router.put('/user/pass/:id', controller.editUserPasswordById)    //user
router.delete('/user', controller.deleteUser)


router.get('/admin/dashboard', controller.adminDashboard)
export default router