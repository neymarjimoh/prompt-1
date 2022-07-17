import { connection, Schema, model, RefType, Document } from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import { Required, RootModel } from "../utils/enum.util";

autoIncrement.initialize(connection);

interface IEvent extends RootModel, Document {
  eventType: string;
  user: number;
  date?: Date | number;
  id?: number;
}

const eventSchema = new Schema({
  eventType: String,
  user: Number,
  date: Date,
});

eventSchema.plugin(autoIncrement.plugin, {
  model: "Event",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

const Event = model<IEvent>("Event", eventSchema);

export { IEvent, Event };
