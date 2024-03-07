import "express-session";
import { Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from 'express-validator';
import { compare, hash } from 'bcrypt';
import sendEmail from "../utils/mailer.js";
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

enum Role { ADMIN, USER }

const registerUser =  async (req: Request<{}, {}, IRequest>, res: Response) => {
    const { firstName, lastName, email, username, password, address } = req.body;
    
    if (address) {
        return res.status(403).send('Access denied: Bot detection triggered.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorOne = errors.array()[0].msg;
        return res.status(409).send(errorOne);
    }
    try {
        const emailCheck = await User.findOne({email});
        if (emailCheck) {
            return res.status(409).send('Email already exists');
        }
        const usernameCheck = await User.findOne({username});
        if (usernameCheck) {
            return res.status(409).send('Username already exists');
        }
        const token = generateToken();
        const hashedPassword = await hash(password, 12);
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            token,
            password: hashedPassword
        });      
        const emailBody = `
            <p>Please verify your email address. If you haven't signed up for this service, you can safely ignore this email.</p>
            <a href="http://192.168.1.202:4000/auth/verify?token=${token}">Verify</a>
        `
        sendEmail(email, 'Verify Your Account', emailBody);
        try {            
            await newUser.save();
            return res.status(200).send(`new user created successfully: ${newUser.username}`);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error: Unable to create user");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
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

export { registerUser, loginUser, verifyUser }
