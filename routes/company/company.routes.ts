import express from "express";
import {
  addCompany,
  getByCompanyName,
  getCompanies,
} from "../../controllers/company/company.controller";

const router = express.Router();

enum CompanyRoutes {
  addCompany = "addCompany",
  search = "search",
}

router.get("/", getCompanies);
router.post(`/${CompanyRoutes.addCompany}`, addCompany);

router.get(`/${CompanyRoutes.search}`, getByCompanyName);

export default router;
