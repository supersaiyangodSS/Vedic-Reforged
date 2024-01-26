import { Document } from 'mongoose';

export interface IStotram extends Document {
    title: string,
    content: string,
    category: string,
    updatedAt: Date,
    createdAt: Date,
}