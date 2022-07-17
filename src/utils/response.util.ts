import { Response } from "express";

export const successRes = (
  res: Response,
  data: any,
  message = "success",
  status = 200
) => {
  return res.status(status).json({
    status: true,
    data,
    message,
    error: false,
  });
};

export const errorResponse = (
  res: Response,
  message = "unsuccessful",
  data = {},
  status = 400
) => {
  return res.status(status).json({
    status: false,
    message,
    error: true,
    data,
  });
};
