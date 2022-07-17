import moment from "moment";
import { innerResponse } from "../utils/enum.util";
import { Event, IEvent } from "../models/index.model";
import { BaseService } from "./base.service";

class EventService extends BaseService {
  super: any;

  // checks for click and pageView events for same user
  private _removeDuplicateClickAndPageViewEvents(
    events: Partial<IEvent>[]
  ): Partial<IEvent>[] {
    // to store the users for clicks and pageViews as a memo cache
    const memo = { click: [], pageView: [] };
    const insertedPayload: Partial<IEvent>[] = [];
    for (let i = 0; i < events.length; i++) {
      const currentEventPayload = events[i];
      switch (currentEventPayload.eventType) {
        case "click":
          if (!memo.click.includes(currentEventPayload.user)) {
            insertedPayload.push({ ...currentEventPayload, date: Date.now() });
            memo.click.push(currentEventPayload.user);
          }
          break;
        case "pageView":
          if (!memo.pageView.includes(currentEventPayload.user)) {
            insertedPayload.push({ ...currentEventPayload, date: Date.now() });
            memo.pageView.push(currentEventPayload.user);
          }
          break;
        default:
          insertedPayload.push({ ...currentEventPayload, date: Date.now() });
          break;
      }
    }
    return insertedPayload;
  }

  public async createEvents(data: Partial<IEvent>[]): Promise<innerResponse> {
    try {
      const eventsToSave = this._removeDuplicateClickAndPageViewEvents(data);
      const cuurentDate = Date.now();
      const queryParameter = {
        $or: [
          { eventType: "click", date: { $gte: cuurentDate - 3000 } },
          {
            eventType: "pageView",
            date: { $gte: cuurentDate - 5000 },
          },
        ],
      };
      const events = await this.findAll(Event, queryParameter);
      if (events.length === 0) {
        await Event.create(eventsToSave);
        return { status: "success", data: { ingested: eventsToSave.length } };
      }
      // TODO: improve runtime of this to (nlogN)
      for (let event of events) {
        eventsToSave.splice(
          eventsToSave.findIndex(
            (e) => e.eventType == event.eventType && e.user == event.user
          ),
          1
        );
      }
      if (eventsToSave.length > 0) {
        await Event.create(eventsToSave);
      }
      return { status: "success", data: { ingested: eventsToSave.length } };
    } catch (error) {
      return { status: "error", data: {} };
    }
  }

  public async fetchEvents(): Promise<innerResponse> {
    try {
      const events = await this.findAll(Event, {});
      return { status: "success", data: events };
    } catch (error) {
      return { status: "error", data: {} };
    }
  }
}

export const eventService = new EventService();
