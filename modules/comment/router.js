import express from 'express';
import controller from './controller.js';
import auth from '../../middleware/auth.js'
const router = express.Router()


router.get('/', controller.commentList);
router.get('/:id', controller.commentById);
router.post('/', controller.craeteComment);
router.put('/:id', controller.updateComment);
router.delete('/:id', controller.deleteComment);

export default router