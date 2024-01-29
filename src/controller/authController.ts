import { Request, Response } from "express";
import Admin from "../models/admin.js";
import { compare } from 'bcrypt';

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).json({ error: 'Username and password are required' });
        }

        const adminLogged = await Admin.findOne({ username });

        if (!adminLogged || !(await compare(password, adminLogged.password))) {
            return res.status(403).json({ error: 'Wrong username or password' });
        }

        req.session.user = username;
        console.log(`User logged in as: ${req.session.user}`);

        return res.status(302).json({ success: `Logged in as: ${req.session.user}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { login };