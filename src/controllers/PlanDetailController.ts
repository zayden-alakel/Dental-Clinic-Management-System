import PlanDetail from "../models/PlanDetail";
import PlanDetailService from "../services/PlanDetailService";

export default class PlanDetailController{
    public constructor(public planDetailService: PlanDetailService){}

    async create(planDetail: PlanDetail, treatmentPlanId: number): Promise<PlanDetail>{
        try {
            return await this.planDetailService.create(planDetail, treatmentPlanId)
        } catch (error) {
            throw error
        }
    }
}