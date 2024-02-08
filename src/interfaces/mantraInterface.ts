import { Document } from 'mongoose';

export interface IMantra extends Document {
    title: string,
    content: string,
    category: string,
    updatedAt: Date,
    createdAt: Date,
}