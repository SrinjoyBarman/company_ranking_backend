import Company, { ICompany } from "../../models/company/company.model";

export const addNewCompany = async (company: ICompany): Promise<ICompany> => {
  const companyObj: ICompany = new Company(company);
  return await companyObj.save();
};

export const getAllCompanies = async (): Promise<ICompany[]> => {
  const companies = await Company.find();
  return companies;
};

export const findCompaniesBySearch = async (
  companyName: string
): Promise<ICompany[]> => {
  const companies = await Company.find({
    name: { $regex: new RegExp(companyName, "i") },
  });
  return companies;
};
