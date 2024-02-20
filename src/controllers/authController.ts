import { Request, Response } from "express";
import User from "../models/User.js";
import { ValidationError } from 'express-validator';

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

export { registerUser }