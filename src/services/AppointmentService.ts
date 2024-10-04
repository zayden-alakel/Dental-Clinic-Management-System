import { Op } from "sequelize";
import Clinic from "../models/Clinic";
import Appointment from "../models/Appointment";
import Patient from "../models/Patient";

export default class AppointmentService {
  public constructor() {}

  async createAppointment(
    appointment: {
      date: string;
      startTime: string;
      endTime: string;
      complaint: string;
      patientName: string;
      patientPhone: string;
    },
    clinicId: number
  ): Promise<Appointment> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) throw new Error("No clinic with such an id");

      const { workingStartTime, workingEndTime } = clinic;

      if (
        appointment.startTime < workingStartTime ||
        appointment.endTime > workingEndTime
      ) {
        throw new Error(
          `Appointment times must be within clinic working hours: ${workingStartTime} to ${workingEndTime}`
        );
      }

      let PatientId = null;
      const patient = await Patient.findOne({
        where: {
          fullName: appointment.patientName,
          phoneNumber: appointment.patientPhone,
        },
      });

      if (patient) {
        PatientId = patient.id;
      }

      const hasOverlap = await this.hasOverlappingAppointment(
        clinicId,
        appointment.date,
        appointment.startTime,
        appointment.endTime
      );
      if (hasOverlap) {
        throw new Error(
          "This appointment overlaps with an existing appointment."
        );
      }

      const createdAppointment = await Appointment.create({
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        complaint: appointment.complaint,
        ClinicId: clinicId,
        PatientId: PatientId,
        patientName: appointment.patientName,
        patientPhone: appointment.patientPhone,
      });

      return createdAppointment;
    } catch (error) {
      throw error;
    }
  }

  async hasOverlappingAppointment(
    clinicId: number,
    date: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    const overlappingAppointments = await Appointment.findAll({
      where: {
        ClinicId: clinicId,
        date: date,
        [Op.or]: [
          {
            startTime: {
              [Op.lt]: endTime,
            },
            endTime: {
              [Op.gt]: startTime,
            },
          },
        ],
      },
    });

    return overlappingAppointments.length > 0;
  }
  async getAppointmentsForClinic(clinicId: number): Promise<Appointment[]> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) throw new Error("No clinic with such an id");

      return await Appointment.findAll({
        where: { ClinicId: clinicId },
        include: [{ model: Patient, attributes: ["fullName", "phoneNumber"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async getAppointmentsForClinicByDate(
    ClinicId: number,
    date: string
  ): Promise<Appointment[]> {
    try {
      const clinic = await Clinic.findByPk(ClinicId);
      if (!clinic) throw new Error("No clinic with such an id");

      return await Appointment.findAll({
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

  async getAvailableTimeSlots(
    clinicId: number,
    date: string
  ): Promise<string[]> {
    try {
      const clinic = await Clinic.findByPk(clinicId);
      if (!clinic) {
        throw new Error("No clinic with such an id");
      }

      const appointments = await Appointment.findAll({
        where: { ClinicId: clinicId, date: date },
        order: [["startTime", "ASC"]],
      });

      const openingTime = clinic.workingStartTime;
      const closingTime = clinic.workingEndTime;
      const slots: string[] = [];
      let lastEndTime = openingTime;

      for (const appointment of appointments) {
        if (lastEndTime < appointment.startTime) {
          slots.push(`${lastEndTime} - ${appointment.startTime}`);
        }
        lastEndTime = appointment.endTime;
      }

      if (lastEndTime < closingTime) {
        slots.push(`${lastEndTime} - ${closingTime}`);
      }

      return slots;
    } catch (error) {
      throw error;
    }
  }

  async deleteAppointment(appointmentId: number): Promise<void> {
    try {
      const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        throw new Error("No appointment found with the specified ID");
      }

      await Appointment.destroy({ where: { id: appointmentId } });
    } catch (error) {
      throw error;
    }
  }
}
