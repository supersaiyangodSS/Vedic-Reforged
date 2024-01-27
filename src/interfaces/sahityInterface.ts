import { Document } from "mongoose";

export interface ISahity extends Document {
    title: string,
    contents: [
        {
            title: string,
            content: string,
            id: number
        },
    ],
    category: string,
    updatedAt: Date,
    createdAt: Date
}