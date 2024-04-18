var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { sessionSecret } from "../app.js";
config();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, address } = req.body;
    const fields = { username, password };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorOne = errors.array()[0].msg;
        return res.status(409).send(errorOne);
    }
    if (address) {
        req.flash('message', 'Access Denied From Backend!');
        return res
            .status(301)
            .redirect('/auth/login');
    }
    try {
        const findUser = yield User.findOne({ username });
        if (!findUser) {
            req.flash('message', 'Invalid Username or Password');
            req.flash('username', username);
            req.flash('password', password);
            return res.status(301)
                .redirect('/auth/login');
        }
        const matchPassword = yield compare(password, findUser.password);
        if (!matchPassword) {
            req.flash('message', 'Invalid Username or Password');
            return res.status(301)
                .redirect('/auth/login');
        }
        if (!sessionSecret) {
            console.log('session secret env not found!');
            process.exit(1);
        }
        const oneDay = 60 * 60 * 24 * 1000;
        const token = jwt.sign({
            userId: findUser._id,
            userEmail: findUser.username,
        }, sessionSecret, { expiresIn: "24h" });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: oneDay
        });
        return res.status(200).send({
            message: "Login Successfull",
            username: findUser.username,
            token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
const loginPage = (req, res) => {
    var _a;
    try {
        if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) {
            return res.status(301).redirect('/dashboard');
        }
        res.status(200).render('login', { title: 'Shri Swami Samarth', message: req.flash('message'), username: req.flash('username'), password: req.flash('password') });
    }
    catch (error) {
        console.error('Error rendering login page', error);
        res.status(500).render('500');
    }
};
export { loginUser, loginPage };
//# sourceMappingURL=authController.js.map