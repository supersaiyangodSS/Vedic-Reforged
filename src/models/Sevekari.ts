import { Schema, model } from 'mongoose';
import { ISevekari } from '../interface/sevekariInterface.js';

const SevekariSchema = new Schema<ISevekari>({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    alternateMobile: {
        type: Number,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

const Sevekari = model<ISevekari>('Sevekari', SevekariSchema);

export default Sevekari;