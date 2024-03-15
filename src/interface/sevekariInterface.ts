import { Document } from 'mongoose';

export declare interface ISevekari extends Document {
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string[],
    address: string,
    mobile: number,
    alternateMobile: number,
    dateOfBirth: Date,
    
}