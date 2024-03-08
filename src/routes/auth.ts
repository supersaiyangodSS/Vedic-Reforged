import { loginUser } from '../controllers/authController.js';
import { Router } from 'express';
import { body } from 'express-validator';

const router : Router = Router();

const loginValidator = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isLength({ min: 6 })
]

router.post('/login', loginValidator, loginUser);

export default router;
