import AppointmentController from "./controllers/AppointmentController";
import AttachmentController from "./controllers/AttachmentController";
import AuthController from "./controllers/AuthController";
import BillController from "./controllers/BillController";
import ClinicController from "./controllers/ClinicController";
import ComplaintController from "./controllers/ComplaintController";
import CompletedTreatmentController from "./controllers/CompletedTreatmentController";
import DiseaseController from "./controllers/DiseaseController";
import MedicationController from "./controllers/MedicationController";
import PatientController from "./controllers/PatientController";
import PatientPaymentController from "./controllers/PatientPaymentController";
import PaymentController from "./controllers/PaymentController";
import PlanDetailController from "./controllers/PlanDetailController";
import TreatmentController from "./controllers/TreatmentController";
import TreatmentPlanController from "./controllers/TreatmentPlanController";
import UserController from "./controllers/UserController";
import WaitingListController from "./controllers/WaitingListController";
import AppointmentService from "./services/AppointmentService";
import { AttachmentService } from "./services/AttachmentService";
import AuthService from "./services/AuthService";
import BillService from "./services/BillService";
import ClinicService from "./services/ClinicService";
import ComplaintService from "./services/ComplaintService";
import CompletedTreatmentService from "./services/CompletedTreatmentService";
import DiseaseService from "./services/DiseaseService";
import MedicationService from "./services/MedicationService";
import PatientPaymentService from "./services/PatientPaymentService";
import PatientService from "./services/PatientService";
import PaymentService from "./services/PaymentService";
import PlanDetailService from "./services/PlanDetailService";
import TreatmentPlanService from "./services/TreatmentPlanService";
import TreatmentService from "./services/TreatmentService";
import UserService from "./services/UserService";
import WaitingListService from "./services/WaitingListService";
import { sequelize } from "./utils/sequlize-init";

export function container() {
  const clinicService = new ClinicService();
  const clinicController = new ClinicController(clinicService);

  const authService = new AuthService();
  const authController = new AuthController(authService);

  const patientService = new PatientService();
  const patientController = new PatientController(patientService);

  const medicationService = new MedicationService();
  const medicationController = new MedicationController(medicationService);

  const diseaseService = new DiseaseService();
  const diseaseController = new DiseaseController(diseaseService);

  const complaintService = new ComplaintService();
  const complaintController = new ComplaintController(complaintService);

  const attachmentService = new AttachmentService();
  const attachmentController = new AttachmentController(attachmentService);

  const appointmentService = new AppointmentService();
  const appointmentController = new AppointmentController(appointmentService);

  const treatmentService = new TreatmentService();
  const treatmentController = new TreatmentController(treatmentService);

  const treatmentPlanService = new TreatmentPlanService();
  const treatmentPlanController = new TreatmentPlanController(
    treatmentPlanService
  );

  const completedTreatmentService = new CompletedTreatmentService();
  const completedTreatmentController = new CompletedTreatmentController(
    completedTreatmentService
  );

  const planDetailService = new PlanDetailService();
  const planDetailController = new PlanDetailController(planDetailService);

  const billService = new BillService();
  const billController = new BillController(billService);

  const paymentService = new PaymentService();
  const paymentController = new PaymentController(paymentService);

  const patientPaymentService = new PatientPaymentService();
  const patientPaymentController = new PatientPaymentController(
    patientPaymentService
  );

  const waitingListService = new WaitingListService();
  const waitingListController = new WaitingListController(waitingListService);

  const userService = new UserService();
  const userController = new UserController(userService);

  return {
    sequelize,
    clinicController,
    authController,
    patientController,
    medicationController,
    diseaseController,
    complaintController,
    attachmentController,
    appointmentController,
    treatmentController,
    treatmentPlanController,
    completedTreatmentController,
    planDetailController,
    billController,
    paymentController,
    patientPaymentController,
    waitingListController,
    userController
  };
}
