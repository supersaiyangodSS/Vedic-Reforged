import { Request, Response } from "express";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorOne = errors.array()[0].msg;
    return res.status(409).send(errorOne);
  }
  if (address) {
    return res
      .status(403)
      .json({ message: "Access denied: Bot detection triggered." });
  }
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const matchPassword = await compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      {
        userId: findUser._id,
        userEmail: findUser.username,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );
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
  res.status(200).render('login', { title: 'Shri Swami Samarth' });
}

export { loginUser, loginPage };
