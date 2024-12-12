import mongoose, { Schema, Document, model } from "mongoose";

export interface ICompany extends Document {
  name: string;
  revenue: number;
  revenueGrowth: number;
  customerSatisfaction: number;
  employeeSatisfaction: number;
  industry: string;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  revenue: { type: Number, required: true },
  revenueGrowth: { type: Number, required: true },
  customerSatisfaction: { type: Number, required: true },
  employeeSatisfaction: { type: Number, required: true },
  industry: { type: String, required: true },
});

export default model<ICompany>("Company", CompanySchema);
