import { Schema, model } from "mongoose";
import { IAdmin } from "../interfaces/adminInterface.js";

const AdminSchema = new Schema<IAdmin>({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Admin = model<IAdmin>('Admin', AdminSchema, 'Admin');

export default Admin;