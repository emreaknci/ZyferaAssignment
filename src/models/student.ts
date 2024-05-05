import mongoose, { Schema } from "mongoose";


export interface IStudent {
    id: number;
    name: string;
    surname: string;
    stdNumber: string;
    grades: [
        {
            code: string;
            value: number;
        }
    ]
}

const studentSchema :Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    stdNumber: { type: String, required: true },
    grades: [
        {
            code: { type: String, required: true },
            value: { type: Number, required: true }
        }
    ]
});

export default mongoose.model<IStudent>('Student', studentSchema);