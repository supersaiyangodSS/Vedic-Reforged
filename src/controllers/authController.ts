import "express-session";
import { Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from 'express-validator';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';

interface IRequest {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    address: string,
}

const generateToken = () => {
    return randomBytes(24).toString('hex');
}

const loginUser = async (req: Request<{}, {}, IRequest>, res: Response) => {
    const { username, password, address } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorOne = errors.array()[0].msg;
        // const errorOne = errors.array();
        return res.status(409).send(errorOne);
    }
    if (address) {
        return res.status(403).send('Access denied: Bot detection triggered.');
    }
    try {
        const findUser = await User.findOne({username})
        if (!findUser) {
            return res.status(401).send('Invalid username or password');
        }
        const matchPassword = await compare(password, findUser.password);
        if (!matchPassword) {
            return res.status(401).send('Invalid username or password');
        }
        if (findUser.verified === false) {
            res.status(301).redirect('/verify');
        }
        req.session.user = findUser.username;
        req.session.role = findUser.role;
        req.session.uid = findUser._id;
        return res.status(200).redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

const verifyUser = async (req: Request, res: Response) => {
    const { token } = req.query;
    try {
        if (!token) {
            return res.status(400).send('Invalid or Expired Token');
        }
        const user = await User.findOne({
            token,
            isTokenUsed: false,
        });
        if (!user) {
            return res.status(404).send('User not found. The provided Token may be invalid or expired.')
        }
        user.verified = true;
        user.isTokenUsed = true;
        user.token = generateToken();
        await user.save();
        const htmlBody = `
            <html>
                <head>
                    <title>Email Verified Successfully</title>
                </head>
                <body>
                    <h2 style="margin-bottom: 10px">Email Verified Successfully</h2>
                    <a href="http://192.168.1.202:5173/">Login to continue</a>
                </body>
            </html>
        `;
        return res.status(200).send(htmlBody);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

export { loginUser, verifyUser }
