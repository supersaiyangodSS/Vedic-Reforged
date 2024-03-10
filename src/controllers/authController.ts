import "express-session";
import { Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from 'express-validator';
import { compare, hash } from 'bcrypt';

interface IRequest {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    address: string,
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
        req.session.user = findUser.username;
        req.session.role = findUser.role;
        req.session.uid = findUser._id;
        return res.status(200).redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

export { loginUser }
