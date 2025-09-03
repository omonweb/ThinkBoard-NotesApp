import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../types/index.js';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
