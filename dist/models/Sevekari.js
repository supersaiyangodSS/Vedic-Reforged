import { Schema, model } from 'mongoose';
const SevekariSchema = new Schema({
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
const Sevekari = model('Sevekari', SevekariSchema);
export default Sevekari;
//# sourceMappingURL=Sevekari.js.map