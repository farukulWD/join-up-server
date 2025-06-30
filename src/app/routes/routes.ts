import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth-route";
import { EventRoutes } from "../module/event/event.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
