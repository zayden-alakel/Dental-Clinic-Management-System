import PlanDetail from "../models/PlanDetail";
import Treatment from "../models/Treatment";
import TreatmentPlan from "../models/TreatmentPlan";

export default class PlanDetailService{
    async create(planDetail: PlanDetail, treatmentPlanId: number): Promise<PlanDetail>{
        try {
            const treatmentPlan = await TreatmentPlan.findByPk(treatmentPlanId);
            const treatment = await Treatment.findByPk(planDetail.treatmentId)
            if(!treatmentPlan || !treatment) throw new Error("404 treatment plan or treatment not found");
            const detail = await PlanDetail.create({
                TreatmentPlanId: treatmentPlanId,
                fromTeeth: planDetail.fromTeeth,
                toTeeth: planDetail.toTeeth,
                place: planDetail.place,
                cost: planDetail.cost
            });
            detail.addTreatment(treatment);
            return detail;
        } catch (error) {
            throw error;
        }
    }
}