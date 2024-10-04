import Bill from "../models/Bill";
import BillService from "../services/BillService";

export default class BillController {
  public constructor(public billService: BillService) {}

  async create(billData: Bill, clinicId: number): Promise<Bill> {
    try {
      const result = await this.billService.create(billData,clinicId);
      return result;
  } catch (error) {
      throw (error);
  }
}  
  async getBills(clinicId: number): Promise<Bill[]> {
    try { 
      const results = await this.billService.getBills(clinicId)
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getIncompleteBills(clinicId: number,startDate: Date, endDate: Date): Promise<Bill[]> {
    try { 
      const results = await this.billService.getIncompleteBills(clinicId,startDate,endDate)
      return results;
    } catch (error) {
      throw error;
    }
  }
  
}
