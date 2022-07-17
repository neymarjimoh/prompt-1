import { Application } from "express";
import eventsRouter from "./events/events.controller";

const apiPrefix: string = "/api/v1";

const routes = [
  {
    prefix: "analytics",
    name: eventsRouter,
  },
];

export default (app: Application) => {
  routes.forEach((element) => {
    app.use(`/${element.prefix}`, element.name);
  });
  return app;
};
