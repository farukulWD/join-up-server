import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IEvent } from "./event.interface";
import httpStatus from "http-status";
import { Event } from "./event.model";
import { QueryBuilder } from "../../query/query-builder";

const createEventService = async (eventData: IEvent) => {
  if (!eventData.title) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event tittle is required");
  }
  if (!eventData.date) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event date is required");
  }
  if (!eventData.time) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event time is required");
  }
  if (!eventData.location) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event Location is required");
  }
  if (!eventData.location) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event Location is required");
  }
  if (!eventData.postedBy) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event Post by id  is required");
  }

  const user = await User.findById(eventData.postedBy);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found!");
  }

  const res = await Event.create(eventData);
  return res;
};

const getAllEventsService = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Event.find(), query);

  const modelQuery = queryBuilder
    .search(["title", "location", "description"])
    .filter()
    .dateFilter("date")
    .sort()
    .paginate()
    .fields()
    .modelQuery.populate("postedBy")
    .populate("joinedUsers");

  const events = await modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: events,
  };
};

const getSingleEventService = async (eventId: string) => {
  if (!eventId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event ID is required");
  }

  const event = await Event.findById(eventId)
    .populate("postBy")
    .populate("joinedUsers");

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  return event;
};

const updateEventService = async (
  eventId: string,
  eventData: Partial<IEvent>
) => {
  if (!eventId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event ID is required");
  }

  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
    new: true,
  });

  return updatedEvent;
};

const getMyEventsService = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  const events = await Event.find({ postedBy: userId })
    .populate("postBy")
    .populate("joinedUsers");

  return events;
};

export const eventServices = {
  createEventService,
  getAllEventsService,
  getSingleEventService,
  updateEventService,
  getMyEventsService,
};
