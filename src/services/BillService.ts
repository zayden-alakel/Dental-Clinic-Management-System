import Bill from "../models/Bill";
import Clinic from "../models/Clinic";
import Payment from "../models/Payment";
import { Op } from "sequelize";

export default class BillService {
    public constructor (){}

  async create(billData: Bill,clinicId: number): Promise<Bill> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
     if (!clinic) {
      throw new Error(`Clinic with ID ${clinicId} not found.`);
    }
    const bill = await clinic.createBill(billData);
    return bill;
    // return await Bill.create({
    //   clinicId: clinicId,
    //   content: billData.content,
    //   provider: billData.provider,
    //   total: billData.total,
    //   type: billData.type
    // })
  } catch (error) {
    throw error;
  }
  }
  async getBills(clinicId: number): Promise<Bill[]> {
    try { 
      
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error("Clinic not found");
      }

      const bills = await clinic.getBills();
      return bills;
    } catch (error) {
      throw error;
    }
  }

  async getIncompleteBills(clinicId: number,startDate: Date,endDate: Date): Promise<Bill[]> {
   
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error(`Clinic with ID ${clinicId} not found.`);
      }

      const bills = await Bill.findAll({
        where: {
          clinicId: clinic.id,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      const incompleteBills: Bill[] = [];

      for (const bill of bills) {
        const payments = await Payment.findAll({
          where: {
            BillId: bill.id,
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
        });

        const totalPaid = payments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );
        const remainingAmount = bill.total - totalPaid;

        if (remainingAmount > 0) {
          incompleteBills.push(bill);
        }
      }

      return incompleteBills;
    } catch (error) {
      throw error;
    }
  }
}