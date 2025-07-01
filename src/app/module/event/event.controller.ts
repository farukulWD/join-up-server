import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { eventServices } from "./event.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const eventData = req.body;
  const userId = req.user.id;
  eventData.postedBy = userId;

  const result = await eventServices.createEventService(eventData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await eventServices.getAllEventsService(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await eventServices.getSingleEventService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event retrieved successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventData = req.body;

  const result = await eventServices.updateEventService(id, eventData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const getMyEvents = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await eventServices.getMyEventsService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My events retrieved successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await eventServices.deleteEventService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

const joinEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await eventServices.joinEventService(id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Joined event successfully",
    data: result,
  });
});

export const eventController = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  getMyEvents,
  deleteEvent,
  joinEvent
};
