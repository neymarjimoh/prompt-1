import { Request, Response } from "express";

export default (
  err: { statusCode: number; message: any; errors: any; status: number },
  req: Request,
  res: Response
): Response<any, Record<string, any>> => {
  if (err.statusCode) {
    // if error has user-defined statusCode then it's a custom error
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      errors: err.errors,
    });
    // if error has system-generated status
  } else if (err.status) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
      errors: [], // no data to return
    });
    // if this is an unknown/uncaught error
  } else {
    let serverError = "";
    // show detailed error message in DEV or TEST environment
    if (["dev", "test"].indexOf(process.env.NODE_ENV) > -1) {
      serverError = `: ${err.message}`;
    }
    //we want to see the actual error
    console.log(err.message);
    return res.status(500).json({
      status: "error",
      message: `Internal server error${serverError}`,
      errors: [], // no data to return
    });
  }
};
