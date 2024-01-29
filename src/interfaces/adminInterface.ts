import { Document } from "mongoose";

export interface IAdmin extends Document {
    fullName: string,
    username: string,
    password: string,
    email: string,
    createdAt: Date,
}