import { Request } from "express";
import { ICompany } from "../../models/company/company.model";

export type GetCompanyRequest = Request<unknown, unknown, unknown, ICompany>;
