import { Request } from 'express';

export interface INote {
  title: string;
  content: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: any; // Using any for now to avoid complex type conflicts
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string; verified: boolean }>;
  photos?: Array<{ value: string }>;
}

export interface JwtPayload {
  userId: string;
  email: string;
}
