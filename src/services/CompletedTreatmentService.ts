import CompletedTreatment from "../models/CompletedTreatment";
import Patient from "../models/Patient";

export default class CompletedTreatmentService{

    async create(completedtreatment: CompletedTreatment, patientId: number): Promise<CompletedTreatment>{
        try {
            const patient = await Patient.findByPk(patientId);
            if(!patient) throw new Error("404 No clinic with such an id");

            return await CompletedTreatment.create({
                PatientId: patientId,
                treatmentId: completedtreatment.treatmentId,
                place: completedtreatment.place,
                fromTeeth: completedtreatment.fromTeeth,
                toTeeth: completedtreatment.toTeeth,
                notes: completedtreatment.notes
            });
        } catch (error) {
            throw error;
        }
    }
}