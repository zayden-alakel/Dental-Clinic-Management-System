import Payment from "../models/Payment";
import Bill from "../models/Bill";
import { Op } from "sequelize";
import Clinic from "../models/Clinic";

export default class PaymentService {
  public constructor() { }

  async create(paymentData: Payment, billId: number): Promise<Payment> {
    try {
      const bill = await Bill.findByPk(billId);
      if (!bill) {
        throw new Error(`Bill with ID ${billId} not found.`);
      }
      const payment = await Payment.create({
        BillId: billId,
        amount: paymentData.amount,
        createdAt: new Date()
      })
      return payment;
    } catch (error) {
      throw error;
    }
  }
  async getAllPayments(): Promise<Payment[]> {
    try {
      const payments = await Payment.findAll();
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async generateReport(provider: string, clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error(`Clinic with ID ${clinicId} not found.`);
      }
      const bills = await Bill.findAll({
        where: {
          provider: provider,
          clinicId: clinicId,
        },
      });

      const report = await Promise.all(bills.map(async (bill) => {
        const payments: Payment[] = await Payment.findAll({
          where: {
            BillId: bill.id,
            createdAt: {
              [Op.between]: [startDate, endDate],
            },


          },
        })
        const totalOwed = bill.total;
        const totalPaid = bills.reduce((total, bill) => {
          const paymentsTotal = payments
            .filter(payment => payment.BillId === bill.id)
            .reduce((sum, payment) => sum + payment.amount, 0);
          return total + paymentsTotal;
        }, 0);
        const remainingAmount = totalOwed - totalPaid;

        return {
          billId: bill.id,
          totalOwed: totalOwed,
          totalPaid: totalPaid,
          remainingAmount: remainingAmount,
        };
      }));

      return report;
    } catch (error) {
      throw error;
    }
  }

  async getexpense(clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error("مركز غير موجود");
      }

      const bills = await Bill.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
          clinicId: clinicId,
        },
        attributes: ['total'],
      });

      let totalRevenue = 0;
      bills.forEach((bill) => {
        totalRevenue += bill.total;
      });

      const payments = await Payment.findAll({
        where: {

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

  async SearchPaymentById(paymentId: number): Promise<Payment | null> {
    try {
      const payment = await Payment.findByPk(paymentId);
      return payment;
    } catch (error) {
      throw error;
    }
  }
}

