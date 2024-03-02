import { Document } from "mongoose";

export interface IAarti extends Document {
    aartiTime: number,
    aartiDate: Date,
    aartiType: string,
    yajman : {
        male: string,
        female: string,
    }
    naivedhyaDharak : string,
    naivedhyaDharakMobileNumber: number,
    naivedhyaDharakAlternateMobileNumber: number,
    count: {
        male: number,
        female: number,
        total: number,
    },
    createdOn: Date,
    createdBy: string,
    updatedOn: Date,
    updatedBy: string,
}