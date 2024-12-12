import { Request, Response } from "express";
import { GetCompanyRequest } from "./company.types";
import {
  addNewCompany,
  findCompaniesBySearch,
  getAllCompanies,
  findCompaniesByIndustryName,
} from "./company.service";
import { ResponseErrorCodes, sendResponse } from "../../utils/api/sendResponse";
import { ICompany } from "../../models/company/company.model";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await getAllCompanies();
    sendResponse<ICompany[]>(
      res,
      200,
      "Successfully retrieved companies",
      companies
    );
  } catch (error) {
    sendResponse(res, 500, "Error fetching companies", undefined, {
      message: "Error fetching companies",
      code: ResponseErrorCodes.INVALID_REQUEST,
    });
  }
};

export const addCompany = async (req: Request, res: Response) => {
  try {
    const savedCompany = await addNewCompany(req.body);

    sendResponse<ICompany>(
      res,
      201,
      "Successfully added company",
      savedCompany
    );
  } catch (error) {
    sendResponse(res, 500, "Error adding company", undefined, {
      message: "Error adding company",
      code: ResponseErrorCodes.INVALID_REQUEST,
    });
  }
};

export const getByCompanyName = async (
  req: GetCompanyRequest,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;

    if (typeof name !== "string" || !name) {
      return sendResponse(
        res,
        400,
        "Name query parameter is required",
        undefined,
        {
          message: "Name query parameter is required",
          code: ResponseErrorCodes.BAD_REQUEST,
        }
      );
    }

    const companies = await findCompaniesBySearch(name);
    if (!companies.length) {
      return sendResponse(
        res,
        404,
        "No companies found with the given name",
        undefined,
        {
          message: "No companies found with the given name",
          code: ResponseErrorCodes.BAD_REQUEST,
        }
      );
    }

    sendResponse<ICompany[]>(
      res,
      200,
      "Successfully fetched companies by name",
      companies
    );
  } catch (error) {
    sendResponse(res, 500, "Error adding company", undefined, {
      message: "Error adding company",
      code: ResponseErrorCodes.INVALID_REQUEST,
    });
  }
};

export const findCompaniesByIndustry = async (
  req: GetCompanyRequest,
  res: Response
) => {
  try {
    const { industry } = req.query;

    if (typeof industry !== "string" || !industry) {
      return sendResponse(
        res,
        400,
        "Industry query parameter is required",
        undefined,
        {
          message: "Industry query parameter is required",
          code: ResponseErrorCodes.BAD_REQUEST,
        }
      );
    }

    const companies = await findCompaniesByIndustryName(industry);

    if (!companies.length) {
      return sendResponse(
        res,
        404,
        "No companies found with the given industry name",
        undefined,
        {
          message: "No companies found with the given industry name",
          code: ResponseErrorCodes.BAD_REQUEST,
        }
      );
    }
    sendResponse<ICompany[]>(
      res,
      200,
      "Successfully fetched companies by industry name",
      companies
    );
  } catch (err) {
    sendResponse(res, 500, "Error adding company", undefined, {
      message: "Error adding company",
      code: ResponseErrorCodes.INVALID_REQUEST,
    });
  }
};
