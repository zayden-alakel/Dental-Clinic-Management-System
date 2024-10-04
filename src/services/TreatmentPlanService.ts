import Patient from "../models/Patient";
import PlanDetail from "../models/PlanDetail";
import TreatmentPlan from "../models/TreatmentPlan";

export default class TreatmentPlanService{

    async create(treatmentPlan: TreatmentPlan, patientId: number): Promise<TreatmentPlan>{
        try {
            const patient = await Patient.findByPk(patientId);
            if(!patient) throw new Error("404 patient not found")

            return await TreatmentPlan.create({
              PatientId: patientId,
              discount: treatmentPlan.discount,
              sessionNumber: treatmentPlan.sessionNumber,
              totalCost: treatmentPlan.totalCost,
              isCompleted: treatmentPlan.isCompleted,
            });
            
        } catch (error) {
            throw error;
        }
    }

    async update(treatmentPlan: TreatmentPlan, treatmentPlanId: number): Promise<any>{
        try {
            const updated = await TreatmentPlan.update({
                discount: treatmentPlan.discount,
                sessionNumber: treatmentPlan.sessionNumber,
                totalCost: treatmentPlan.totalCost
            }, {where: {id: treatmentPlanId}})
            console.log(updated);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getDetails(treatmentPlanId: number): Promise<PlanDetail[]>{
        try {
            const treatmentPlan = await TreatmentPlan.findByPk(treatmentPlanId);
            if(!treatmentPlan) throw new Error("404 treatmentplan not found");
            return await treatmentPlan.getDetails({include:{association: PlanDetail.associations.treatments, attributes: ['title', 'category', 'defaultCost']}});
        } catch (error) {
            throw error;
        }
    }
}