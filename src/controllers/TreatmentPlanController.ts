import PlanDetail from "../models/PlanDetail";
import TreatmentPlan from "../models/TreatmentPlan";
import TreatmentPlanService from "../services/TreatmentPlanService";

export default class TreatmentPlanController{

    public constructor(public treatmentPlanService: TreatmentPlanService){}

    async create(treatmentPlan: TreatmentPlan, userId: number): Promise<TreatmentPlan>{
        try {
            return await this.treatmentPlanService.create(treatmentPlan, userId);
        } catch (error) {
            throw error;
        }
    }

    async update(treatmentPlan: TreatmentPlan, treamentPlanId: number): Promise<any>{
        try {
            return await this.treatmentPlanService.update(treatmentPlan, treamentPlanId);
        } catch (error) {
            throw error;
        }
    }

    async getDetails(treatmentPlanId: number): Promise<PlanDetail[]>{
        try {
            return await this.treatmentPlanService.getDetails(treatmentPlanId);
        } catch (error) {
            throw error;
        }
    }
}