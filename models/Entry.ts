import { Entry } from "@/interface";
import mongoose, { Model, Schema } from "mongoose";

export interface IEntry extends Entry {

}

const entrySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    createdAt: { type: Number, required: true },
    status: {
        type: String,
        default: 'pending',
        enum: {
            values: ['pending','in-progress','finished'],
            message: '{VALUE} no es un estado permitido'
        }
    }
})


const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel