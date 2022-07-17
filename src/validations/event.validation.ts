import { celebrate } from "celebrate";
import Joi from "joi";

class EventValidation {
  public createEventsValidation() {
    return celebrate({
      body: Joi.array().items(
        Joi.object({
          user: Joi.number().required(),
          eventType: Joi.string().required(),
        })
      ),
    });
  }
}

export const eventValidation = new EventValidation();
