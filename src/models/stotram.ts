import { Schema, model } from 'mongoose';
import { IStotram } from '../interfaces/stotramInterface.js';

const stotramSchema = new Schema<IStotram>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Stotram = model<IStotram>('Stotram', stotramSchema);

export default Stotram;