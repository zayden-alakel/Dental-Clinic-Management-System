import CompletedTreatment from "../models/CompletedTreatment";
import CompletedTreatmentService from "../services/CompletedTreatmentService";

export default class CompletedTreatmentController{

    public constructor(public completedTreatmentService: CompletedTreatmentService){}
    
    async create(completedtreatment: CompletedTreatment, patientId: number): Promise<CompletedTreatment>{
        try {
            return await this.completedTreatmentService.create(completedtreatment, patientId);
        } catch (error) {
            throw error;
        }
    }
}