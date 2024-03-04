import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    role: string,
    verified: boolean,
    token: string,
    isTokenUsed: boolean,
    createdOn: Date,
    updatedOn: Date
}