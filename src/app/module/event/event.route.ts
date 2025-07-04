import { Router } from "express";
import { eventController } from "./event.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { eventValidationSchema } from "./event.validation";

const route = Router();

route.get("/all-events", eventController.getAllEvents);
route.get("/single-event/:id", eventController.getSingleEvent);

route.post(
  "/create-event",
  auth(),
  validateRequest(eventValidationSchema),
  eventController.createEvent
);
route.put("/update-event/:id", eventController.updateEvent);
route.get("/my-events", auth(), eventController.getMyEvents);
route.delete("/delete-event/:id", auth(), eventController.deleteEvent);
route.post("/join-event/:id", auth(), eventController.joinEvent);

export const EventRoutes = route;
  