import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    role: string,
    created_at: Date,
    updated_at: Date
}