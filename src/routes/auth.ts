import { loginUser } from '../controllers/authController.js';
import { Router } from 'express';
import { body } from 'express-validator';

const router : Router = Router();

const loginValidator = [
	body('username').notEmpty().withMessage('Username is required!').isString(),
	body('password').notEmpty().withMessage('Password cannot be empty!').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

router.post('/login', loginValidator, loginUser);

export default router;
