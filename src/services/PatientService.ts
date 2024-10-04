import Clinic from "../models/Clinic";
import CompletedTreatment from "../models/CompletedTreatment";
import Patient from "../models/Patient";
import TreatmentPlan from "../models/TreatmentPlan";

export default class PatientService {
  public constructor() {}

  async create(patient: Patient, clinicId: number): Promise<Patient> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) throw new Error("no clinic with such an id");

      const existingPatients = await clinic.getPatients({
        where: {
          fullName: patient.fullName,
          email: patient.email,
        },
      });

      if (existingPatients.length > 0) {
        throw new Error("patient is already added to this clinic!");
      }

      const createdPatient = await Patient.create({
        address: patient.address,
        age: patient.age,
        email: patient.email,
        fullName: patient.fullName,
        habits: patient.habits,
        phoneNumber: patient.phoneNumber,
        gender: patient.gender,
        birthDate: patient.birthDate,
      });
      await clinic.addPatient(createdPatient);
      return createdPatient;
    } catch (error) {
      throw error;
    }
  }

  async getPatient(patientId: number): Promise<any> {
    try {
      const patient = await Patient.findByPk(patientId, {
        include: [
          Patient.associations.medications,
          Patient.associations.complaints,
          Patient.associations.diseases,
          Patient.associations.attachments,
        ],
      });
      if (!patient) throw new Error("no patient with such an id");
      return patient;
    } catch (error) {
      throw error;
    }
  }

  async getTreatmentPlans(patientId: number): Promise<TreatmentPlan[]> {
    try {
      const patient = await Patient.findByPk(patientId);
      if (!patient) throw new Error("no patient with such an id");
      return await patient.getTreatmentplans();
    } catch (error) {
      throw error;
    }
  }

  async getCompletedTreatments(
    patientId: number
  ): Promise<CompletedTreatment[]> {
    try {
      const patient = await Patient.findByPk(patientId);
      if (!patient) throw new Error("no patient with such an id");
      return await patient.getCompletedtreatments({
        include: {
          association: CompletedTreatment.associations.treatment,
          attributes: ["title", "category", "color"],
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
