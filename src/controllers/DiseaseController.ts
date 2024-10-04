import { NextFunction, Request, Response } from "express";
import Disease from "../models/Disease";
import DiseaseService from "../services/DiseaseService";

export default class DiseaseController {
  public constructor(public diseaseService: DiseaseService) {}

  async create(disease: Disease, patientId: number): Promise<Disease> {
    try {
      const result = await this.diseaseService.create(disease, patientId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
