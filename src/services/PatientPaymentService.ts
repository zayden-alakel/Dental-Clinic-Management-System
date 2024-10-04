import TreatmentPlan from "../models/TreatmentPlan";
import PatientPayment from "../models/PatientPayment";
import Patient from "../models/Patient";
import Clinic from "../models/Clinic";
import { sequelize } from "../utils/sequlize-init"
import { Op } from "sequelize";
import Bill from "../models/Bill";
import Payment from "../models/Payment";

export default class PatientPaymentService {
  public constructor() { }

  async create(patientpayment: PatientPayment, patientId: number, clinicId: number, treatmentPlanId: number): Promise<PatientPayment> {
    try {

      const result = await PatientPayment.create({
        PatientId: patientId,
        ClinicId: clinicId,
        TreatmentPlanId: treatmentPlanId,
        amount: patientpayment.amount,
        createdAt: new Date()
      })
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAccountStatement(patientId: number, treatmentPlanId: number): Promise<any> {
    try {
      const patientPayments = await PatientPayment.findAll({
        where: {
          PatientId: patientId,
          TreatmentPlanId: treatmentPlanId,
        },
        attributes: ['amount'],
      });
      const treatmentPlan = await TreatmentPlan.findByPk(treatmentPlanId, {
        attributes: ['totalCost', 'discount'],
      });

      if (!treatmentPlan) {
        throw new Error('Account statement not found.');
      }

      const totalCost = treatmentPlan.totalCost;
      const discount = treatmentPlan.discount || 0;
      const discountedAmount = totalCost * (1 - discount);

      let paidAmount = 0;
      patientPayments.forEach((payment) => {
        paidAmount += payment.amount;
      });

      const remainingAmount = discountedAmount - paidAmount;

      return {
        totalCost,
        discount,
        discountedAmount,
        paidAmount,
        remainingAmount,
      };
    } catch (error) {
      throw error;
    }
  }

  async getPatientDebts(clinicId: number): Promise<any> {
    try {
      const patientDebts = await PatientPayment.findAll({
        attributes: ['TreatmentPlanId', [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']],
        include: [
          {
            model: Patient,
            attributes: ['fullName'],
          },
          {
            model: TreatmentPlan,
            attributes: ['totalCost', 'discount'],
          }
        ],
        where: {
          ClinicId: clinicId,
        },
        group: ['Patient.fullName', 'PatientPayment.TreatmentPlanId', 'TreatmentPlan.totalCost', 'TreatmentPlan.discount'],
        having: sequelize.literal('SUM(amount) < (treatmentplan.totalCost * (1 - treatmentplan.discount))'),
      });
      return patientDebts.map((patientDebt: any) => ({
        patientName: patientDebt.Patient.fullName,
        treatmentPlanNumber: patientDebt.TreatmentPlanId,
        totalCost: patientDebt.TreatmentPlan.totalCost,
        amount: patientDebt.dataValues.totalAmount,
        remainingAmount: (patientDebt.TreatmentPlan.totalCost * (1 - patientDebt.TreatmentPlan.discount)) - patientDebt.dataValues.totalAmount,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getRevenue(clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error("مركز غير موجود");
      }

      const treatmentPlans = await TreatmentPlan.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },

        },
        attributes: ['totalCost', 'discount'],
      });

      let totalRevenue = 0;
      treatmentPlans.forEach((plan) => {
        const discountedAmount = plan.totalCost * (1 - (plan.discount || 0));
        totalRevenue += discountedAmount;
      });

      const payments = await PatientPayment.findAll({
        where: {
          ClinicId: clinicId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },

        },
        attributes: ['amount'],
      });

      let totalPaidAmount = 0;

      payments.forEach((payment) => {
        totalPaidAmount += payment.amount;
      });

      const remainingAmount = totalRevenue - totalPaidAmount;

      return {
        totalRevenue,
        totalPaidAmount,
        remainingAmount,
      };
    } catch (error) {
      throw error;
    }
  }

  async getpatientpayments(clinicId: number): Promise<PatientPayment[]> {
    try {
      const patientPayments = await PatientPayment.findAll({
        where: {
          ClinicId: clinicId,
        },
      });
      return patientPayments;
    } catch (error) {
      throw error;
    }
  }

  async SearchPatientPaymentById(patientpaymentId: number): Promise<PatientPayment | null> {
    try {
      const patientpayment = await PatientPayment.findByPk(patientpaymentId);
      return patientpayment;
    } catch (error) {
      throw error;
    }
  }

  async getClinicNetProfit(clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error("مركز غير موجود");
      }
      const patientPayments = await PatientPayment.findAll({
        where: {
          ClinicId: clinicId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: ['amount'],
      });

      let totalPaidAmount = 0;
      patientPayments.forEach((payment) => {
        totalPaidAmount += payment.amount;
      });

      const bills = await Bill.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: ['total'],
      });

      let totalBillAmount = 0;
      bills.forEach((bill) => {
        totalBillAmount += bill.total;
      });

      const payments = await Payment.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: ['amount'],
      });

      let totalPaymentAmount = 0;
      payments.forEach((payment) => {
        totalPaymentAmount += payment.amount;
      });

      const totalCosts = totalBillAmount - totalPaymentAmount;
      const netProfit = totalPaidAmount - totalCosts;

      return {
        totalPaidAmount,
        totalCosts,
        netProfit,
      };
    } catch (error) {
      throw error;
    }
  }

}






