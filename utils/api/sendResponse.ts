import { Response } from "express";

export enum ResponseErrorCodes {
  INVALID_REQUEST = "INVALID_REQUEST",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface ResponseError {
  code: ResponseErrorCodes;
  message: string;
  details?: any;
}

export const sendResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T,
  error?: ResponseError
) => {
  const response = {
    status,
    message,
    ...(data && { data }),
    ...(error && { error }),
  };
  res.status(status).json(response);
};

export const sendErrorResponse = (
  res: Response,
  status: number,
  message: string,
  code: ResponseErrorCodes,
  error?: any
) => {
  sendResponse(res, status, message, undefined, {
    message,
    code,
    details: error,
  });
};
