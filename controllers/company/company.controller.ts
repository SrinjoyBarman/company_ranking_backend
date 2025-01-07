import { Request, Response } from "express";
import {
  addNewCompany,
  findCompaniesBySearch,
  getAllCompanies,
  findCompaniesByIndustryName,
} from "../../services/company/company.service";
import {
  ResponseErrorCodes,
  sendErrorResponse,
  sendResponse,
} from "../../utils/api/sendResponse";
import { ICompany } from "../../models/company/company.model";
import { GetCompanyRequest } from "../../types/company/company.types";
import { Messages } from "../../utils/fallbackMessages";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await getAllCompanies();
    sendResponse<ICompany[]>(
      res,
      200,
      Messages.COMPANY_SUCCESSFULLY_FETCHED,
      companies
    );
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      Messages.COMPANIES_NOT_FOUND,
      ResponseErrorCodes.SERVER_ERROR
    );
  }
};

export const addCompany = async (req: Request, res: Response) => {
  try {
    const savedCompany = await addNewCompany(req.body);

    sendResponse<ICompany>(
      res,
      201,
      Messages.COMPANY_SUCCESSFULLY_ADDED,
      savedCompany
    );
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      Messages.ERROR_ADDING_COMPANY,
      ResponseErrorCodes.SERVER_ERROR
    );
  }
};

export const getByCompanyName = async (
  req: GetCompanyRequest,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;

    if (typeof name !== "string" || !name) {
      return sendErrorResponse(
        res,
        400,
        Messages.PARAM_REQUIRED("NAME"),
        ResponseErrorCodes.BAD_REQUEST
      );
    }

    const companies = await findCompaniesBySearch(name);
    if (!companies.length) {
      return sendErrorResponse(
        res,
        404,
        Messages.COMPANY_NOT_FOUND,
        ResponseErrorCodes.NOT_FOUND
      );
    }

    sendResponse<ICompany[]>(
      res,
      200,
      Messages.COMPANY_SUCCESSFULLY_FETCHED,
      companies
    );
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      Messages.ERROR_ADDING_COMPANY,
      ResponseErrorCodes.SERVER_ERROR
    );
  }
};

export const findCompaniesByIndustry = async (
  req: GetCompanyRequest,
  res: Response
) => {
  try {
    const { industry } = req.query;

    if (typeof industry !== "string" || !industry) {
      return sendErrorResponse(
        res,
        400,
        Messages.PARAM_REQUIRED("Industry"),
        ResponseErrorCodes.BAD_REQUEST
      );
    }

    const companies = await findCompaniesByIndustryName(industry);

    if (!companies.length) {
      return sendErrorResponse(
        res,
        404,
        Messages.INDUSTRY_NOT_FOUND,
        ResponseErrorCodes.NOT_FOUND
      );
    }
    sendResponse<ICompany[]>(
      res,
      200,
      Messages.COMPANY_SUCCESSFULLY_FETCHED,
      companies
    );
  } catch (err) {
    sendErrorResponse(
      res,
      500,
      Messages.ERROR_ADDING_COMPANY,
      ResponseErrorCodes.SERVER_ERROR
    );
  }
};
