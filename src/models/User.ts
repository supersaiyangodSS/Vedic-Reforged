import { IUser } from 'interface/UserInterface.js';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: "USER",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
        trim: true,
    },
    isTokenUsed: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    updatedOn: {
        type: Date,
        default: Date.now,
    }
});

const User = model('User', userSchema);

export default User;