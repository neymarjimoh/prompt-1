import { Router, Request, Response } from "express";
import { eventService } from "../../services/index.service";
import { errorResponse, successRes } from "../../utils/response.util";
import { eventValidation } from "../../validations/index.validation";

const eventsRouter = Router();

eventsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const response = await eventService.fetchEvents();
    if (response.status == "error") {
      return errorResponse(
        res,
        "Error processing request. Try again",
        response.data,
        400
      );
    }

    return successRes(res, response.data);
  } catch (error: any) {
    return errorResponse(
      res,
      "an error occured, contact support for help",
      500
    );
  }
});

eventsRouter.post(
  "",
  eventValidation.createEventsValidation(),
  async (req: Request, res: Response) => {
    try {
      const eventDTO = req.body;
      const response = await eventService.createEvents(eventDTO);

      if (response.status == "error") {
        return errorResponse(
          res,
          "Error processing request. Try again",
          response.data,
          400
        );
      }

      return successRes(res, response.data, 201);
    } catch (error: any) {
      return errorResponse(
        res,
        "an error occured, contact support for help",
        500
      );
    }
  }
);

export default eventsRouter;
