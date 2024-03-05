import { loginUser, registerUser } from '../controllers/authController.js';
import { Router , Request, Response } from 'express';
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

router.get('/', (req: Request, res: Response) => {
    return res.status(301).redirect('/login');
});

router.post('/login', loginValidator, loginUser);

router.post('/register', registerValidator, registerUser);

export default router;
