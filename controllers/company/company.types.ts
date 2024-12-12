import { Request } from "express";
import { GetCompanyByNameRequestParams } from "./company.interface";

export type GetCompanyByNameRequest = Request<
  unknown,
  unknown,
  unknown,
  GetCompanyByNameRequestParams
>;
