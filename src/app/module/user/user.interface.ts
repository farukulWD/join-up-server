import { Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  photoURL: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
