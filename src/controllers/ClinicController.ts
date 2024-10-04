import { NextFunction, Request, Response } from "express";
import Clinic from "../models/Clinic";
import ClinicService from "../services/ClinicService"
import Patient from "../models/Patient";
import Treatment from "../models/Treatment";

export default class ClinicController{
    public constructor (public clinicService: ClinicService){}

    async create(clinic: Clinic): Promise<Clinic>{
        try {
            return await this.clinicService.create(clinic);
        } catch (error) {
            throw (error);
        }
    }

    async getPatients(clinicId: number): Promise<Patient[]>{
        try {
            return await this.clinicService.getPatients(clinicId);
        } catch (error) {
            throw(error)
        }
    }

    async getTreatments(clinicId: number): Promise<Treatment[]>{
        try {
            return await this.clinicService.getTreatments(clinicId);
        } catch (error) {
            throw(error)
        }
    }

    async addPatient(): Promise<any>{
        // const patient = await Patient.findByPk(2);
        // console.log("patient", patient);
        // const clinic = await Clinic.findByPk(1, {
        //     include: [
        //         {
        //             model: Patient,
        //             through: {attributes: []}
        //         }
        //     ]
        // });

        // return await Clinic.findByPk(1, {include: [
        //     {
        //         association: Clinic.associations.patients,
        //         attributes: ["address"]

        //     }
        // ]})

        // const clinic = await Clinic.findByPk(1);
        // return clinic?.getPatients({attributes: ['id', 'fullName']});

        // return clinic?.addPatient(patient as Patient);
        
    }
}