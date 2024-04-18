var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { randomBytes } from 'crypto';
import { Router } from 'express';
import { hash } from 'bcrypt';
import User from '../models/User.js';
const router = Router();
const generateToken = () => {
    return randomBytes(24).toString('hex');
};
router.post('/create-ssj', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const isAdmin = yield User.findOne({ email });
        if (isAdmin) {
            return res.status(403).send('Email already exists!');
        }
        const isUsername = yield User.findOne({ username });
        if (isUsername) {
            return res.status(403).send('Username already exists!');
        }
        const hashPassword = yield hash(password, 12);
        if (!hashPassword) {
            return res.status(500).send('Internal server error!');
        }
        const token = generateToken();
        const newAdmin = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
            role: 'ADMIN',
            token
        });
        yield newAdmin.save();
        return res.status(200).send(`User created successfully: ${username}`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error!');
    }
}));
export default router;
//# sourceMappingURL=createAdmin.js.map