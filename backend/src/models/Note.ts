import mongoose, { Document, Schema } from 'mongoose';
import { INote } from '../types/index.js';

export interface INoteDocument extends INote, Document {
  _id: string;
}

const noteSchema = new Schema<INoteDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model<INoteDocument>('Note', noteSchema);

export default Note;
