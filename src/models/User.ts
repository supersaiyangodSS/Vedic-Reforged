import { IUser } from '../interface/userInterface.js';
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
		default: 'USER',
	},
	token: {
		type: String,
		required: true,
		trim: true,
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

const User = model<IUser>('User', userSchema);

export default User;