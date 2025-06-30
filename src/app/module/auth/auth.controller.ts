import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie("join-up-refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      user,
    },
  });
});

export const authControllers = {
  loginUser,
};
