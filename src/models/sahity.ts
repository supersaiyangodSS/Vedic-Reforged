import { ISahity } from "../interfaces/sahityInterface.js";
import { Schema, model } from "mongoose";

const SahitySchema = new Schema<ISahity>({
    title: {
        type: String,
        required: true
    },
    contents: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                default: 1 
            }
        },
    ],
    category: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Sahity = model<ISahity>('Sahity', SahitySchema, 'sahity');

export default Sahity;