import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await userServices.createUserService(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User has been created",
    data: result,
  });
});

export const userController = {
  createUserController,
};
