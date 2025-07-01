import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { loginValidationSchema } from "./auth.validation";
import { authControllers } from "./auth.controller";

const router = Router();

router.post(
  "/sign-in",
  validateRequest(loginValidationSchema),
  authControllers.loginUser
);
router.post("/sign-out", authControllers.logoutUser);

export const AuthRoutes = router;
