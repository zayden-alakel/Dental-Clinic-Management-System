import Complaint from "../models/Complaint";
import Patient from "../models/Patient";

export default class ComplaintService {
  public constructor() {}

  async create(complaint: Complaint, patientId: number): Promise<Complaint> {
    try {
      const patient = await Patient.findByPk(patientId);
      if(!patient) throw new Error("404 patient not found")
      const createdComplaint = await Complaint.create({
        PatientId: patientId,
        complaintText: complaint.complaintText,
        consultation: complaint.consultation
      });
      return createdComplaint;
    } catch (error) {
      throw error;
    }
  }
}
