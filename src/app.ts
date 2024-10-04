import express, { Express, NextFunction, Request, Response } from "express";
import { container } from "./container";
import authenticate from "./middlewares/authenticate";
import Clinic from "./models/Clinic";
import Disease from "./models/Disease";
import Medication from "./models/Medication";
import Attachment from "./models/Attachment";
import Complaint from "./models/Complaint";
import Bill from "./models/Bill";
import TreatmentPlan from "./models/TreatmentPlan";
import Treatment from "./models/Treatment";
import CompletedTreatment from "./models/CompletedTreatment";
import Payment from "./models/Payment";
import PlanDetail from "./models/PlanDetail";
import Appointment from "./models/Appointment";
import PatientPayment from "./models/PatientPayment";
import upload from "./middlewares/multer";
import {
  TreatmentDetailsSchema,
  appointmentSchema,
  clinicSchema,
  complaintSchema,
  completedTreatmentSchema,
  diseaseSchema,
  loginSchema,
  medicationSchema,
  patientSchema,
  registerSchema,
  treatmentPlanSchema,
  treatmentSchema,
  waitingListSchema,
} from "./utils/validation";
import checkRoles from "./middlewares/checkRoles";
import Roles from "./utils/Roles";

export default async function appFactory(): Promise<Express> {
  //test sync models
  const bill = new Bill();
  // const patient = new Clinic();
  // const disease = new Disease()
  // const medication = new Medication();
  // const attachments = new Attachment();
  // const complaint = new Complaint();
  // const payments = new Payment();
  // const treatmentPlan = new TreatmentPlan();
  // const treatment = new Treatment();
  // const completedTreatment = new CompletedTreatment();
  // const planDetail = new PlanDetail();
  // const appointment = new Appointment();
  // const patientPayments = new PatientPayment();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const {
    sequelize,
    clinicController,
    authController,
    patientController,
    complaintController,
    diseaseController,
    medicationController,
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
  } = container();

  //Connecting to sequelize
  sequelize
    .authenticate()
    .then(() => {
      console.log("Sequelize Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
      process.exit(1);
    });

  try {
    await sequelize.sync();
  } catch (error) {
    console.error("sql error", error);
  }

  //testing connection
  app.get("", async (req, res, next) => {
    const ress = await clinicController.addPatient();
    return res.json(ress);
  });

  //Clinic Apis
  app.post(
    "/clinic",
    authenticate,
    checkRoles(Roles.ADMIN),
    async (req, res, next) => {
      console.log("hihihih");
      try {
        await clinicSchema.validateAsync(req.body);
        const result = await clinicController.create(req.body);
        return res.status(200).json({
          status: "success",
          message: "Clinic Created Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/clinic/:id/patients",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const result = await clinicController.getPatients(
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "Patients for clinic retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/clinic/:id/treatments",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        const result = await clinicController.getTreatments(
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "treaments for clinic retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Treatments Apis
  app.post(
    "/clinic/:id/treatment",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await treatmentSchema.validateAsync(req.body);
        const result = await treatmentController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "treatments created successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Treatment Plans Apis
  app.post(
    "/patient/:id/treatment-plan",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await treatmentPlanSchema.validateAsync(req.body);
        const result = await treatmentPlanController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "treatment plan created successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.put(
    "/treatment-plan/:id",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        const result = await treatmentPlanController.update(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "treatment plan updated successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/treatment-plan/:id/details",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        const result = await treatmentPlanController.getDetails(
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "Deatils for treatment plans retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Plan Detail Apis
  app.post(
    "/treatment-plan/:id/detail",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await TreatmentDetailsSchema.validateAsync(req.body);
        const result = await planDetailController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "plan detail created successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Completed Treatments Apis
  app.post(
    "/patient/:id/completed-treatments",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await completedTreatmentSchema.validateAsync(req.body);
        const result = await completedTreatmentController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "completed treatment created successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Patient Apis
  app.post(
    "/patient",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await patientSchema.validateAsync(req.body);
        const result = await patientController.create(
          req.body,
          req.body.clinicId
        );
        return res.status(200).json({
          status: "success",
          message: "Patient Created Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/patient/:id",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const result = await patientController.getPatient(
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "Get Patient done!",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    "/patient/:id/medication",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await medicationSchema.validateAsync(req.body);
        const result = await medicationController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "Medication Created Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    "/patient/:id/disease",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await diseaseSchema.validateAsync(req.body);
        const result = await diseaseController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "Disease Created Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    "/patient/:id/complaint",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        await complaintSchema.validateAsync(req.body);
        const result = await complaintController.create(
          req.body,
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "Complaint Created Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/patient/:id/treatment-plans",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        const result = await patientController.getTreatmentPlans(
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "treament plans for patient retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/patient/:id/completed-treatments",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    async (req, res, next) => {
      try {
        const result = await patientController.getCompletedTreatments(
          parseInt(req.params["id"])
        );
        return res.status(200).json({
          status: "success",
          message: "completed treatments for patient retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //attachment
  app.post(
    "/patient/:id/attachments",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT),
    upload.array("attachments"),
    async (req, res, next) => {
      try {
        const attachments: Express.Multer.File[] =
          req.files! as Express.Multer.File[];
        //  const attachments = Array.from(req.files as Express.Multer.File[]).map((file: Express.Multer.File)=>({
        //  PatientId: req.body.patientId,
        // title: file.originalname,
        //  url: file.filename,
        //  }));
        () => {};
        if (attachments && attachments.length > 0) {
          const attachmentData = await Promise.all(
            attachments?.map(
              async (attachment: Express.Multer.File) => (
                console.log("name", attachment.originalname),
                {
                  title: req.body.title,
                  url: attachment.destination + "//" + attachment.filename,
                }
              )
            )
          );

          const result = await attachmentController.create(
            attachmentData,
            parseInt(req.params["id"])
          );

          return res.status(200).json({
            status: "success",
            message: "attachment Created Successfully",
            data: result,
          });
        } else {
          return res.status(400).json({
            status: "error",
            message: "No attachments were provided.",
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  //Auth Apis
  app.post("/auth/signup", async (req, res, next) => {
    try {
      await registerSchema.validateAsync(req.body);
      const result = await authController.signup(req.body);
      return res.status(200).json({
        status: "sucess",
        msg: "user created successfully",
        data: result,
        token: result.token,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/auth/login", async (req, res, next) => {
    try {
      await loginSchema.validateAsync(req.body);
      const result = await authController.login(
        req.body.email,
        req.body.password
      );
      return res.status(200).json({
        status: "success",
        msg: "user logged in successfully",
        data: result.user.clinic,
        token: result.token,
      });
    } catch (error) {
      next(error);
    }
  });

  //Appointments Apis
  app.post(
    "/appointment/clinic/:clinicId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        await appointmentSchema.validateAsync(req.body);
        const clinicId = parseInt(req.params["clinicId"]);
        const result = await appointmentController.createAppointment(
          req.body,
          clinicId
        );
        return res.status(200).json({
          status: "success",
          message: "Appointment Created Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  app.get(
    "/appointment/clinic/:clinicId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const result = await appointmentController.getAppointmentsForClinic(
          parseInt(req.params["clinicId"])
        );
        return res.status(200).json({
          status: "success",
          message: "Appointments for clinic retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/appointment/clinic/:clinicId/:date",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const ClinicId = parseInt(req.params["clinicId"]);
        const date = req.params["date"];
        const result =
          await appointmentController.getAppointmentsForClinicByDate(
            ClinicId,
            date
          );
        return res.status(200).json({
          status: "success",
          message: "Appointments for clinic by date retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/appointment/time-slot/:clinicId/:date",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const clinicId = parseInt(req.params["clinicId"]);
        const date = req.params["date"];
        const result = await appointmentController.getAvailableTimeSlots(
          date,
          clinicId
        );
        return res.status(200).json({
          status: "success",
          message: "TimeSlots for Appointments retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete(
    "/appointment/:appointmentId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const appointmentId = parseInt(req.params["appointmentId"]);
        const result = await appointmentController.deleteAppointment(
          appointmentId
        );
        return res.status(200).json({
          status: "success",
          message: "Appointment Deleted successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //WaitingList APIs
  app.post(
    "/waiting-list/clinic/:clinicId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        await waitingListSchema.validateAsync(req.body);
        const ClinicId = parseInt(req.params["clinicId"]);
        const result = await waitingListController.addToWaitingList(
          req.body,
          ClinicId
        );
        return res.status(200).json({
          status: "success",
          message: "Added to WaitingList Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  app.get(
    "/waiting-list/clinic/:clinicId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const result = await waitingListController.getWaitingList(
          parseInt(req.params["clinicId"])
        );
        return res.status(200).json({
          status: "success",
          message: "WaitingList for clinic retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/waiting-list/clinic/:clinicId/:date",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const ClinicId = parseInt(req.params["clinicId"]);
        const date = req.params["date"];
        const result =
          await waitingListController.getWaitingListsForClinicByDate(
            ClinicId,
            date
          );
        return res.status(200).json({
          status: "success",
          message: "WaitingList for clinic by date retreived successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/waiting-list/check/:waitingListId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const waitingListId = parseInt(req.params["waitingListId"]);
        const result = await waitingListController.checkFromWaitingList(
          waitingListId
        );
        return res.status(200).json({
          status: "success",
          message: "Available Times Checked",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    "/waiting-list/add/:waitingListId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.ASSISTANT, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const waitingListId = parseInt(req.params["waitingListId"]);
        const appointmentData = req.body;
        const result = await waitingListController.addFromWaitingList(
          waitingListId,
          appointmentData
        );
        return res.status(200).json({
          status: "success",
          message: "Appointment Added and Removed from Waiting List",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Financial
  app.post(
    "/bill",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const billData = req.body;
        const clinicId = req.body.clinicId;

        const bill = await billController.create(billData, clinicId);

        return res.status(200).json({
          status: "success",
          message: "Bill Created Successfully",
          data: bill,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //getbill
  app.get(
    "/clinic/:id/bills",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const clinicId = Number(req.params.id);

        const bills = await billController.getBills(clinicId);

        return res.status(200).json({
          status: "success",
          message: "Bills Retrieved Successfully",
          data: bills,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //add payment
  app.post(
    "/payment",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const paymentData = req.body;
        const billId = req.body.billId;

        const payment = await paymentController.create(paymentData, billId);

        return res.status(200).json({
          status: "success",
          message: "Payment Created Successfully",
          data: payment,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //get payment
  app.get(
    "/payments",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const payments = await paymentController.getAllPayments();

        return res.status(200).json({
          status: "success",
          message: "Payments Retrieved Successfully",
          data: payments,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //generatereportprovider
  app.post(
    "/reportprovider",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const reportprovider = await paymentController.generateReport(
          req.body.provider,
          req.body.clinicId,
          req.body.startDate,
          req.body.endDate
        );

        return res.status(200).json({
          status: "success",
          message: "report Created Successfully",
          data: reportprovider,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // الفواتير الغير مكتملة
  app.post(
    "/getIncompleteBills",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const bills = await billController.getIncompleteBills(
          req.body.clinicId,
          req.body.startDate,
          req.body.endDate
        );
        return res.status(200).json({
          status: "success",
          message: "Bills Retrieved Successfully",
          data: bills,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // تقرير المصاريف
  app.post(
    "/getexpense",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const result = await paymentController.getexpense(
          req.body.clinicId,
          req.body.startDate,
          req.body.endDate
        );
        return res.status(200).json({
          status: "success",
          message: "generate an expense report Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/searchPayment/:Id",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const Id = Number(req.params.Id);

        const payment = await paymentController.SearchPaymentById(Id);

        return res.status(200).json({
          status: "success",
          message: "Payment Retrieved Successfully",
          data: payment,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Patient Payments controller
  app.post(
    "/patientpayment",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const patientpayment = await patientPaymentController.create(
          req.body,
          req.body.patientId,
          req.body.clinicId,
          req.body.treatmentPlanId
        );

        return res.status(200).json({
          status: "success",
          message: "Payment Created Successfully",
          data: patientpayment,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // تفصيل حساب مريض
  app.get(
    "/AccountStatement/:patientId/:treatmentPlanId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const patientId = Number(req.params.patientId);
        const treatmentPlanId = parseInt(req.params.treatmentPlanId);

        const result = await patientPaymentController.getAccountStatement(
          patientId,
          treatmentPlanId
        );

        return res.status(200).json({
          status: "success",
          message: "show AccountStatment Successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // الزبائن الذي عليهم ديون
  app.get("/getPatientDebts/:clinicId", async (req, res, next) => {
    try {
      const clinicId = Number(req.params.clinicId);

      const patientdebts = await patientPaymentController.getPatientDebts(
        clinicId
      );

      return res.status(200).json({
        status: "success",
        message: "patientdebts retrived Successfully",
        data: patientdebts,
      });
    } catch (error) {
      next(error);
    }
  });

  // تقرير الايرادات
  app.post(
    "/getrevenu",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const revenue = await patientPaymentController.getRevenue(
          req.body.clinicId,
          req.body.startDate,
          req.body.endDate
        );

        return res.status(200).json({
          status: "success",
          message: "Revenue retrived Successfully",
          data: revenue,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // الدفعات التابعة لمركز
  app.get(
    "/patientpayments/:clinicId",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const clinicId = Number(req.params.clinicId);

        const patientpayments =
          await patientPaymentController.getpatientpayments(clinicId);

        return res.status(200).json({
          status: "success",
          message: "PatientPayments Retrieved Successfully",
          data: patientpayments,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    "/searchpatientpayment/:Id",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const Id = Number(req.params.Id);

        const patientpayment =
          await patientPaymentController.SearchPatientPaymentById(Id);

        return res.status(200).json({
          status: "success",
          message: "PatientPayment Retrieved Successfully",
          data: patientpayment,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    "/ClinicNetProfit",
    authenticate,
    checkRoles(Roles.ADMIN, Roles.DOCTOR, Roles.SECRETARY),
    async (req, res, next) => {
      try {
        const netProfit = await patientPaymentController.getClinicNetProfit(
          req.body.clinicId,
          req.body.startDate,
          req.body.endDate
        );

        return res.status(200).json({
          status: "success",
          message: "ClinicNetProfit calculate Successfully",
          data: netProfit,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //User Services
  app.post('/user/create-secretary', authenticate, checkRoles(Roles.ADMIN, Roles.DOCTOR), async(req, res, next) => {
    try {
      const result = await userController.createSecretary(req.body);
      return res.status(200).json({
        status: "success",
        message: "secretary created successfully",
        data: result,
      });
    } catch (error) {
      next(error)
    }
  })

  app.post('/user/create-assistant', authenticate, checkRoles(Roles.ADMIN, Roles.DOCTOR), async(req, res, next) => {
    try {
      const result = await userController.createAssistant(req.body);
      return res.status(200).json({
        status: "success",
        message: "assistant created successfully",
        data: result,
      });
    } catch (error) {
      next(error)
    }
  })

  //error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({ message: err.message || "Internal Server error" });
  });

  return app;
}
