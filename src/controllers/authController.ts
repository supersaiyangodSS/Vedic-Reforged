import { Request, Response } from "express";
import User from "../models/User.js";
import { ValidationError } from 'express-validator';
import { compare } from 'bcrypt';

const registerUser =  async (req: Request, res: Response) => {
    const { firstName, lastName, email, username, password } = req.body;
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

const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
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