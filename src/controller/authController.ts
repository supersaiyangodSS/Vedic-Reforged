import { Request, Response } from "express";
import Admin from "../models/admin.js";
import { compare, hash } from 'bcrypt';

const createAdmin = async (req: Request, res: Response) => {
    try {
        const { fullName, email, username, password } = req.body;
        if (!fullName || !email || !username || !password) {
            return res.json({ error:  'all fields are required!'})
        }
        const hashedPassword = await hash(password, 10);
        const newAdmin = new Admin({
            fullName,
            username,
            email,
            password: hashedPassword
        });
        if (newAdmin) {
            await newAdmin.save();
        }
        return res.send('user created');
    } catch (error) {
        console.log(error);        
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { username, password, remember } = req.body;
        if (!username || !password) {
            return res.status(403).json({ error: 'Username and password are required' });
        }
        const adminLogged = await Admin.findOne({ username });
        if (!adminLogged || !(await compare(password, adminLogged.password))) {
            return res.status(403).json({ error: 'Wrong username or password' });
        }
        console.log(`User logged in as: ${req.session.user}`);
        if (remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        req.session.user = username;
        res.status(302).json({ success: `Logged in as: ${req.session.user}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            return res.json({ error: `Error destroying session: ${err}` });
        }
    });
    res.redirect('/auth');
}

export { login, logout, createAdmin };