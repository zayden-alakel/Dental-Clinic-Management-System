import Appointment from "../models/Appointment";
import AppointmentService from "../services/AppointmentService";

export default class AppointmentController {
  public constructor(public appointmentService: AppointmentService) {}

  async createAppointment(
    appointment: Appointment,
    clinicId: number
  ): Promise<Appointment> {
    try {
      return await this.appointmentService.createAppointment(
        appointment,
        clinicId
      );
    } catch (error) {
      throw error;
    }
  }

  async getAppointmentsForClinic(clinicId: number): Promise<Appointment[]> {
    try {
      return await this.appointmentService.getAppointmentsForClinic(clinicId);
    } catch (error) {
      throw error;
    }
  }

  async getAppointmentsForClinicByDate(
    ClinicId: number,
    date: string
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentService.getAppointmentsForClinicByDate(
        ClinicId,
        date
      );
    } catch (error) {
      throw error;
    }
  }

  async getAvailableTimeSlots(
    date: string,
    clinicId: number
  ): Promise<string[]> {
    try {
      return await this.appointmentService.getAvailableTimeSlots(
        clinicId,
        date
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteAppointment(appointmentId: number): Promise<void> {
    try {
      return await this.appointmentService.deleteAppointment(appointmentId);
    } catch (error) {
      throw error;
    }
  }
}
