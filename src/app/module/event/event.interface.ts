import { Document, Types } from "mongoose";

export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  postedBy: Types.ObjectId | string;
  date: Date;
  time: string;
  location: string;
  description: string;
  attendeeCount: number;
  joinedUsers: (Types.ObjectId | string)[];
  createdAt: Date;
  updatedAt: Date;
}
