import { config } from "dotenv";
import { Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { sessionSecret } from "../app.js";
config();

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  address: string;
}

const loginUser = async (req: Request<{}, {}, IRequest>, res: Response) => {
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
      .redirect('/auth/login')
  }
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      req.flash('message', 'Invalid Username or Password')
      req.flash('username', username);
      req.flash('password', password);
      return res.status(301)
      .redirect('/auth/login')
    }
    const matchPassword = await compare(password, findUser.password);
    if (!matchPassword) {
      req.flash('message', 'Invalid Username or Password')
      return res.status(301)
      .redirect('/auth/login')
    }
    if (!sessionSecret) {
      console.log('session secret env not found!');      
      process.exit(1);
    }
    const oneDay = 60 * 60 * 24 * 1000;
    const token = jwt.sign(
      {
        userId: findUser._id,
        userEmail: findUser.username,
      },
      sessionSecret,
      { expiresIn: "24h" }
    );
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: oneDay
    })
    return res.status(200).send({
      message: "Login Successfull",
      username: findUser.username,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const loginPage = (req: Request, res: Response) => {  
  try {
    if(req.cookies?.token) {
      return res.status(301).redirect('/dashboard');
    }
    res.status(200).render('login', { title: 'Shri Swami Samarth', message: req.flash('message'), username: req.flash('username'), password: req.flash('password') });
  } catch (error) {
    console.error('Error rendering login page', error);
    res.status(500).render('500');
  }
}

export { loginUser, loginPage };
