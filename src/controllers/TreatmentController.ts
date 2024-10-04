import Treatment from "../models/Treatment";
import TreatmentService from "../services/TreatmentService";

export default class TreatmentController{
    public constructor(public treatmentService: TreatmentService){}

    async create(treatment: Treatment, clinicId: number): Promise<Treatment>{
        try {
            return await this.treatmentService.create(treatment, clinicId);
        } catch (error) {
            throw (error);
        }
    }
}