import { Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
