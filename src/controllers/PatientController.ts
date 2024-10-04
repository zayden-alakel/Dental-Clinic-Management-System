import CompletedTreatment from "../models/CompletedTreatment";
import Patient from "../models/Patient";
import TreatmentPlan from "../models/TreatmentPlan";
import PatientService from "../services/PatientService";

export default class PatientController {
  public constructor(public patientService: PatientService) {}

  async create(patient: Patient, clinicId: number): Promise<Patient> {
    try {
      return await this.patientService.create(patient, clinicId);
    } catch (error) {
      throw error;
    }
  }

  async getPatient(patientId: number): Promise<any>{
    try {
      return await this.patientService.getPatient(patientId);
    } catch (error) {
      throw error;
    }
  }

  async getTreatmentPlans(patientId: number): Promise<TreatmentPlan[]>{
    try {
      return await this.patientService.getTreatmentPlans(patientId);
    } catch (error) {
      throw error;
    }
  }

  async getCompletedTreatments(patientId: number): Promise<CompletedTreatment[]>{
    try {
      return await this.patientService.getCompletedTreatments(patientId);
    } catch (error) {
      throw error;
    }
  }
}
