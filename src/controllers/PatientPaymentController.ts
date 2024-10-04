
import PatientPayment from "../models/PatientPayment";
import PatientPaymentService from "../services/PatientPaymentService";


export default class PatientPaymentController {
  public constructor(public patientpaymentService: PatientPaymentService) { }

  async create(patientpayment: PatientPayment, patientId: number, clinicId: number, treatmentPlanId: number): Promise<PatientPayment> {
    try {
      const result = await this.patientpaymentService.create(patientpayment, patientId, clinicId, treatmentPlanId);
      return result;
    } catch (error) {
      throw (error);
    }
  }
  async getAccountStatement(patientId: number, treatmentPlanId: number): Promise<any> {//
    try {
      const result = await this.patientpaymentService.getAccountStatement(patientId, treatmentPlanId)
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPatientDebts(clinicId: number): Promise<any> {
    try {
      const result = await this.patientpaymentService.getPatientDebts(clinicId)
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getRevenue(clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try {
      const result = await this.patientpaymentService.getRevenue(clinicId, startDate, endDate)
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getpatientpayments(clinicId: number): Promise<PatientPayment[]> {
    try {
      const results = await this.patientpaymentService.getpatientpayments(clinicId)
      return results;
    } catch (error) {
      throw error;
    }
  }

  async SearchPatientPaymentById(patientpaymentId: number): Promise<PatientPayment | null> {
    try {
      const results = await this.patientpaymentService.SearchPatientPaymentById(patientpaymentId)
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getClinicNetProfit(clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try {
      const result = await this.patientpaymentService.getClinicNetProfit(clinicId, startDate, endDate)
      return result;
    } catch (error) {
      throw error;
    }
  }
}