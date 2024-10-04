import Clinic from "../models/Clinic";
import User from "../models/User";
import Patient from "../models/Patient";
import Treatment from "../models/Treatment";

export default class ClinicService {
  public constructor() {}

  async create(clinic: Clinic): Promise<Clinic> {
    console.log(clinic);
    try {
      const existingClinic = await Clinic.findOne({
        where: {
          name: clinic.name,
        },
      });

      if (existingClinic) {
        throw new Error("Clinic Name is already in use");
      }

      const createdClinic = await Clinic.create({
        name: clinic.name,
        address: clinic.address,
        telePhoneNumber: clinic.telePhoneNumber,
        phoneNumber: clinic.phoneNumber,
        whatsappNumber: clinic.whatsappNumber,
        ownerName: clinic.ownerName,
        ownerAddress: clinic.ownerAddress,
        ownerPhone: clinic.ownerPhone,
        ownerEmail: clinic.ownerEmail
      });
      return createdClinic;
    } catch (error) {
      throw error;
    }
  }

  async getPatients(clinicId: number): Promise<Patient[]> {
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) throw new Error("404 No clinic with such an id");
    return await clinic.getPatients({
      attributes: ["fullName", "age", "gender", "address"],
    });
  }

  async getTreatments(clinicId: number): Promise<Treatment[]> {
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) throw new Error("404 No clinic with such an id");
    return await clinic.getTreatments();
  }
}
