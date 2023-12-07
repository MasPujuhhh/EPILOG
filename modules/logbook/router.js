import express from 'express';
import controller from './controller.js';
import auth from '../../middleware/auth.js'
const router = express.Router()


// router.post('/:id', controller.createLogbook);
router.get('/all', controller.logbookList);
router.get('/', controller.logbookListUser);
// router.put('/:id', controller.editUserPassword);
// router.delete('/:id', controller.deleteUser);

export default router