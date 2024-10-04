import Medication from "../models/Medication";
import Patient from "../models/Patient";

export default class MedicationService {
  public constructor() {}

  async create(medication: Medication, patientId: number): Promise<Medication> {
    const patient = await Patient.findByPk(patientId);
    if(!patient) throw new Error("404 patient not found")
    try {
      const createdMedication = await Medication.create({
        PatientId: patientId,
        medicationList: medication.medicationList,
        allergyList: medication.allergyList,
      });
      return createdMedication;
    } catch (error) {
      throw error;
    }
  }
  //update
  //delete
}
