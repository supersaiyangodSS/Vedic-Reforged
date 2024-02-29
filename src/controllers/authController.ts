import "express-session";
import { Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from 'express-validator';
import { compare } from 'bcrypt';

interface IRequest {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    address: string,
}

const registerUser =  async (req: Request<{}, {}, IRequest>, res: Response) => {
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
        res.status(500).send("Internal Server Error!");
    }
}

const loginUser = async (req: Request<{}, {}, IRequest>, res: Response) => {
    const { username, password, address } = req.body;
    if (address) {
        return res.status(403).send('Access denied: Bot detection triggered.');
    }
    try {
        const findUser = await User.findOne({
            username: username
        })
        if (!findUser) {
            return res.status(404).send('Invalid username or password');
        }
        const matchPassword = await compare(password, findUser.password);
        if (!matchPassword) {
            return res.status(404).send('Invalid username or password');
        }
        req.session.user = findUser.username;
        req.session.role = findUser.role;
        req.session.uid = findUser._id;
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export { registerUser, loginUser }