import { NextFunction, Request, Response } from "express";
import Medication from "../models/Medication";
import MedicationService from "../services/MedicationService";

export default class MedicationController {
  public constructor(public medicationService: MedicationService) {}

  async create(medication: Medication, patientId: number): Promise<Medication> {
    try {
      return await this.medicationService.create(medication, patientId);
    } catch (error) {
      throw error;
    }
  }
}
