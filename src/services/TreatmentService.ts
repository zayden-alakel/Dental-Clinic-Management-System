import Clinic from "../models/Clinic";
import Treatment from "../models/Treatment";

export default class TreatmentService{

    async create(treatment: Treatment, clinicId: number): Promise<Treatment>{
        try {
            const clinic = await Clinic.findByPk(clinicId);
            if(!clinic){
                throw new Error("404 No clinic with such an id")
            }
            return await Treatment.create({
                ClinicId: clinicId,
                title: treatment.title,
                category: treatment.category,
                defaultCost: treatment.defaultCost,
                description: treatment.description,
                color: treatment.color
            });
        } catch (error) {
            throw error;
        }
    }
}
