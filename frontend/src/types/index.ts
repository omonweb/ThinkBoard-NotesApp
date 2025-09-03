export interface INote {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: IUser | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title: string;
  content: string;
}
