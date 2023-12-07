import express from 'express';
import controller from './controller.js';
import auth from '../../middleware/auth.js'
const router = express.Router()


router.get('/', controller.certificateList);
router.post('/', controller.craeteCertificate);
router.get('/:id', controller.certificateById)
router.put('/:id', controller.updateCertificate);
router.delete('/:id', controller.deleteCertificate);

export default router