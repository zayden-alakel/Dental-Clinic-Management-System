import Disease from "../models/Disease";
import Patient from "../models/Patient";

export default class DiseaseService {
  public constructor() {}

  async create(disease: Disease, patientId: number): Promise<Disease> {
    const patient = await Patient.findByPk(patientId);
    if(!patient) throw new Error("404 patient not found")
    try {
      const createdDisease = await Disease.create({
        PatientId: patientId,
        diseaseList: disease.diseaseList,
        notes: disease.notes,
      });

      return createdDisease;
    } catch (error) {
      throw error;
    }
  }
  //update
  //delete
}
