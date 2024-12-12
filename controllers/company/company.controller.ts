import { Request, Response } from "express";
import { GetCompanyByNameRequest } from "./company.types";
import {
  addNewCompany,
  findCompaniesBySearch,
  getAllCompanies,
} from "./company.service";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

export const addCompany = async (req: Request, res: Response) => {
  try {
    const savedCompany = await addNewCompany(req.body);
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: "Error adding company", error });
  }
};

export const getByCompanyName = async (
  req: GetCompanyByNameRequest,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;

    if (typeof name !== "string" || !name) {
      res.status(400).json({ message: "Name query parameter is required" });
    }

    const companies = await findCompaniesBySearch(name);
    if (!companies.length) {
      res
        .status(404)
        .json({ message: "No companies found with the given name" });
    }

    res.status(200).json(companies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching companies by name", error });
  }
};
