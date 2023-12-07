import express from 'express';
import controller from './controller.js';
import auth from '../../middleware/auth.js'
const router = express.Router()


router.get('/', controller.todoList);
router.post('/', controller.createTodo);
router.get('/user/', controller.todoListByIdforUser);
router.get('/user/:id', controller.todoListByIdforUserGetOne);
router.get('/admin/:id', controller.todoListByIdforAdmin);
// router.get('/tes', controller.searchTodo);

export default router