import { Schema, model, Document } from 'mongoose';
import { IAarti } from '../interface/AartiInterface.js';

const AartiSchema = new Schema<IAarti>({
    aartiTime: {
        type: Number,
        required: true
    },
    aartiDate: {
        type: Date,
        required: true,
    },
    aartiType: {
        type: String,
        required: true
    },
    yajman: {
        male: {
            type: String,
            required: function(this: IAarti) {
                return !this.yajman.female
            }
        },
        female: {
            type: String,
            required: function(this: IAarti) {
                return !this.yajman.male
            }
        }
    },
    naivedhyaDharak: {
        type: String,
        required: true
    },
    naivedhyaDharakMobileNumber: {
        type: Number,
        required: true
    },
    naivedhyaDharakAlternateMobileNumber: {
        type: Number,
    },
    count: {
        male: {
            type: Number,
        },
        female: {
            type: Number,
        },
        total: {
            type: Number,
        }
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        required: true,
    }
})

const Aarti = model("Aarti", AartiSchema);

export default Aarti;

