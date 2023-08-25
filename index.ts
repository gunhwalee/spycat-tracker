import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const trafficParser = function (apikey: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const response = await axios.post(
        `https://eb.spy-cat.co.kr/api/servers/${apikey}/traffics`,
        {
          type: "traffic",
          path: req.url,
          host: req.headers.host,
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error)
        console.error("Error sending traffic data:", error.message);
    }
    next();
  };
};

export const errorParser = function (apikey: string) {
  return async function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await axios.post(
        `https://eb.spy-cat.co.kr/api/servers/${apikey}/errors`,
        {
          type: "error",
          errorName: err.name,
          errorMessage: err.message,
          errorStack: err.stack,
          path: req.url,
          method: req.method,
          host: req.headers.host,
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error)
        console.error("Error sending error data:", error.message);
    }
    next(err);
  };
};
