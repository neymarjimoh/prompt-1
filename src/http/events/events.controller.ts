import { Router, Request, Response } from "express";
import { errorResponse, successRes } from "../../utils/response.util";

const eventsRouter = Router();

eventsRouter.get("/", (req: Request, res: Response) => {
  return res.json({ msg: "set up working" });
});

export default eventsRouter;
