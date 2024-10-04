import { NextFunction, Request, Response } from "express";
import Complaint from "../models/Complaint";
import ComplaintService from "../services/ComplaintService";

export default class ComplaintController {
  public constructor(public complaintService: ComplaintService) {}

  async create(complaint: Complaint, patientId: number): Promise<Complaint> {
    try {
      return await this.complaintService.create(complaint, patientId);
    } catch (error) {
      throw error;
    }
  }
}
