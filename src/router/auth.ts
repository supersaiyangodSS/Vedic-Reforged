import { Router } from 'express';
import { createAdmin, login, logout } from '../controller/authController.js';
import { isAuth } from '../app.js';

const router = Router();

router.post('/', login);
router.get('/logout', logout);
router.post('/admin', isAuth, createAdmin);

export default router;
