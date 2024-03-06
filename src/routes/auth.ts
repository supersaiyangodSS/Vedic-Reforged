import { loginUser, registerUser, verifyUser } from '../controllers/authController.js';
import { Router } from 'express';
import { body } from 'express-validator';

const router : Router = Router();

const registerValidator = [
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('username').notEmpty().isAlphanumeric().isLength({ min: 3, max: 20 }),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 })
]

const loginValidator = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isLength({ min: 6 })
]

const otpValidator = [
    body('otp').notEmpty().isLength({ min: 6 })
]

router.post('/login', loginValidator, loginUser);

router.post('/register', registerValidator, registerUser);

router.get('/verify', otpValidator, verifyUser);

export default router;
