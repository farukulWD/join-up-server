import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUserService = async (userData: IUser) => {
  if (!userData.name) {
    throw new AppError(httpStatus.BAD_REQUEST, "User name is required");
  }
  if (!userData.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "User email is required");
  }
  if (!userData.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "User password is required");
  }
  if (!userData.photoURL) {
    throw new AppError(httpStatus.BAD_REQUEST, "User photoURL is required");
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser?.id) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already existing");
  }

  const res = await User.create(userData);
  return res;
};

export const userServices = {
  createUserService,
};
