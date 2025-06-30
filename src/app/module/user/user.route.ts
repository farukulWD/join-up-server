import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/sign-up",
  validateRequest(userValidationSchema),
  userController.createUserController
);

export const UserRoutes = router;
