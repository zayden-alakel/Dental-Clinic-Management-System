import WaitingListService from "../services/WaitingListService";
import WaitingList from "../models/WaitingList";
import Appointment from "../models/Appointment";

export default class WaitingListController {
  public constructor(public waitingListService: WaitingListService) {}

  async addToWaitingList(
    waitingList: WaitingList,
    ClinicId: number
  ): Promise<WaitingList> {
    try {
      return await this.waitingListService.addToWaitingList(
        waitingList,
        ClinicId
      );
    } catch (error) {
      throw error;
    }
  }

  async getWaitingList(ClinicId: number): Promise<WaitingList[]> {
    try {
      return await this.waitingListService.getWaitingList(ClinicId);
    } catch (error) {
      throw error;
    }
  }

  async getWaitingListsForClinicByDate(
    ClinicId: number,
    date: string
  ): Promise<WaitingList[]> {
    try {
      return await this.waitingListService.getWaitingListForClinicByDate(
        ClinicId,
        date
      );
    } catch (error) {
      throw error;
    }
  }

  async checkFromWaitingList(waitingListId: number): Promise<any> {
    try {
      return await this.waitingListService.checkFromWaitingList(waitingListId);
    } catch (error) {
      throw error;
    }
  }

  async addFromWaitingList(
    waitingListId: number,
    appointmentData: {
      date: string;
      startTime: string;
      endTime: string;
      complaint: string;
      patientName: string;
      patientPhone: string;
    }
  ): Promise<Appointment> {
    try {
      return await this.waitingListService.addFromWaitingList(
        waitingListId,
        appointmentData
      );
    } catch (error) {
      throw error;
    }
  }
}
