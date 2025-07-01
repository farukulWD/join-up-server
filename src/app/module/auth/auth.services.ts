import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import { StringValue } from "ms";
import { IUser } from "../user/user.interface";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  if (!user._id) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User ID is missing");
  }

  const jwtPayload = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  const userWithoutPassword = user.toObject() as Partial<IUser>;

  delete userWithoutPassword.password;
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as StringValue
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as StringValue
  );

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

const logoutUser = async () => {
  // Invalidate the user's refresh token
  return {};
};

export const authServices = {
  loginUser,
  logoutUser,
};
