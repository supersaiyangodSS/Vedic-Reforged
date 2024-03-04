import "express-session";
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from 'express-validator';
import { compare } from 'bcrypt';
import { CustomrError } from "../errors/customError.js";

interface IRequest {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    address: string,
}

enum Role { ADMIN, USER }

const registerUser =  async (req: Request<{}, {}, IRequest>, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, username, password, address } = req.body;
    if (address) {
        return res.status(403).send('Access denied: Bot detection triggered.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password
        });
        try {
            await newUser.save();
            return res.status(200).send(`new user created successfully: ${newUser.firstName}`)
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error: Unable to create user");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const loginUser = async (req: Request<{}, {}, IRequest>, res: Response, next: NextFunction) => {
    const { username, password, address } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorOne = errors.array()[0].msg;

        return res.status(301).redirect('/auth');
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
            throw new CustomrError('Custom Error Message', 301);
        }
        req.session.user = findUser.username;
        req.session.role = findUser.role;
        req.session.uid = findUser._id;
        return res.status(200).redirect('/dashboard');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { registerUser, loginUser }
