import { Schema, model } from 'mongoose';
import { IMantra } from '../interfaces/mantraInterface.js';

const stotramSchema = new Schema<IMantra>({
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
});

const Stotram = model<IMantra>('Stotram', stotramSchema);

export default Stotram;