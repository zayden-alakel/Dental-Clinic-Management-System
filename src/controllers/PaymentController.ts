import Payment from "../models/Payment";
import PaymentService from "../services/PaymentService";
import Bill from "../models/Bill";

export default class PaymentController {
  public constructor(public paymentService: PaymentService) {}

  async create(paymentData: Payment, billId: number): Promise<Payment> {
    try{
      const result = await this.paymentService.create(paymentData,billId);
      return result ;
    } catch (error) {
      throw error;
    }
  }
  async getAllPayments(): Promise<Payment[]> {
    try { 
      const results = await this.paymentService.getAllPayments()
      return results;
    } catch (error) {
      throw error;
    }
  }

  async generateReport(provider: string,clinicId: number, startDate: Date, endDate: Date): Promise<any> {
    try{
      const result = await this.paymentService.generateReport(provider,clinicId,startDate,endDate);
      return result ;
    } catch (error) {
      throw error;
    }
}

async getexpense(clinicId: number,startDate: Date, endDate: Date): Promise<any> {
  try{
    const results = await this.paymentService.getexpense(clinicId,startDate,endDate);
    return results;
  } catch (error) {
    throw error;
  }
}

async SearchPaymentById(paymentId: number): Promise<Payment | null> {
  try{
    const results = await this.paymentService.SearchPaymentById(paymentId);
    return results;
  } catch (error) {
    throw error;
  }
}
}