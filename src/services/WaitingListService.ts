import WaitingList from "../models/WaitingList";
import Clinic from "../models/Clinic";
import Patient from "../models/Patient";
import Appointment from "../models/Appointment";
import AppointmentService from "./AppointmentService";

export default class WaitingListService {
  private appointmentService: AppointmentService;
  public constructor() {
    this.appointmentService = new AppointmentService();
  }

  async addToWaitingList(
    waitingList: WaitingList,
    ClinicId: number
  ): Promise<WaitingList> {
    try {
      const clinic = await Clinic.findByPk(ClinicId);
      if (!clinic) throw new Error("No clinic with such an id");

      let PatientId = null;
      const patient = await Patient.findOne({
        where: {
          fullName: waitingList.patientName,
          phoneNumber: waitingList.patientPhone,
        },
      });

      if (patient) {
        PatientId = patient.id;
      }
      const existingEntry = await WaitingList.findOne({
        where: {
          ClinicId,
          patientName: waitingList.patientName,
          patientPhone: waitingList.patientPhone,
          date: waitingList.date,
        },
      });

      if (existingEntry) {
        throw new Error(
          "Patient is already in the waiting list for this clinic on the same date"
        );
      }

      const entry = await WaitingList.create({
        ClinicId: ClinicId,
        PatientId: PatientId,
        date: waitingList.date,
        patientName: waitingList.patientName,
        patientPhone: waitingList.patientPhone,
      });

      return entry;
    } catch (error) {
      throw error;
    }
  }

  async getWaitingList(clinicId: number): Promise<WaitingList[]> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) throw new Error("No clinic with such an id");

      return await WaitingList.findAll({
        where: { ClinicId: clinicId },
        include: [{ model: Patient, attributes: ["fullName", "phoneNumber"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async getWaitingListForClinicByDate(
    ClinicId: number,
    date: string
  ): Promise<WaitingList[]> {
    try {
      const clinic = await Clinic.findByPk(ClinicId);
      if (!clinic) throw new Error("No clinic with such an id");

      return await WaitingList.findAll({
        where: {
          ClinicId: ClinicId,
          date: date,
        },
        include: [{ model: Patient, attributes: ["fullName", "phoneNumber"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async checkFromWaitingList(waitingListId: number): Promise<any> {
    try {
      const waitingListEntry = await WaitingList.findByPk(waitingListId);
      if (!waitingListEntry) {
        throw new Error("No waiting list entry with such an id");
      }

      const { date, patientName, patientPhone, PatientId, ClinicId } =
        waitingListEntry;

      const availableTimeSlots =
        await this.appointmentService.getAvailableTimeSlots(ClinicId, date);

      if (availableTimeSlots.length === 0) {
        throw new Error("No available time slots on the specified date.");
      }

      let validSlot;
      for (const slot of availableTimeSlots) {
        const [startTime, endTime] = slot.split(" - ");
        const endDateTime = new Date(
          new Date(`1970-01-01T${startTime}Z`).getTime() + 15 * 60000
        )
          .toISOString()
          .substr(11, 8);

        const hasOverlap =
          await this.appointmentService.hasOverlappingAppointment(
            ClinicId,
            date,
            startTime,
            endDateTime
          );
        if (!hasOverlap) {
          validSlot = { startTime, endTime: endDateTime };
          break;
        }
      }

      if (!validSlot) {
        throw new Error("No valid time slot available.");
      }

      return {
        date: date,
        patientName: patientName,
        patientPhone: patientPhone,
        PatientId: PatientId,
        startTime: validSlot.startTime,
        endTime: validSlot.endTime,
        complaint: "From WaitingList",
      };
    } catch (error) {
      throw error;
    }
  }

  async addFromWaitingList(
    waitingListId: number,
    appointmentData: any
  ): Promise<Appointment> {
    try {
      const waitingListEntry = await WaitingList.findByPk(waitingListId);
      if (!waitingListEntry)
        throw new Error("No waiting list entry with such an id");

      const { ClinicId } = waitingListEntry;

      const newAppointment = await this.appointmentService.createAppointment(
        {
          date: appointmentData.date,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          complaint: appointmentData.complaint,
          patientName: appointmentData.patientName,
          patientPhone: appointmentData.patientPhone,
        },
        ClinicId
      );
      await WaitingList.destroy({ where: { id: waitingListId } });

      return newAppointment;
    } catch (error) {
      throw error;
    }
  }
}
