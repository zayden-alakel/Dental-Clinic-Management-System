import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../utils/sequlize-init";
import Patient from "./Patient";
import Bill from "./Bill";
import Treatment from "./Treatment";
import Appointment from "./Appointment";
import PatientPayment from "./PatientPayment";
import User from "./User";

export default class Clinic extends Model<
  InferAttributes<Clinic>,
  InferCreationAttributes<Clinic>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare telePhoneNumber: string;
  declare phoneNumber: CreationOptional<string>;
  declare whatsappNumber: string;
  declare ownerName: string;
  declare ownerPhone: string;
  declare ownerAddress: string;
  declare ownerEmail: string;
  declare workingStartTime: CreationOptional<string>;
  declare workingEndTime: CreationOptional<string>;

  declare addPatient: HasManyAddAssociationMixin<Patient, number>;
  declare getPatients: HasManyGetAssociationsMixin<Patient>;

  declare getTreatments: HasManyGetAssociationsMixin<Treatment>;

  declare addUser: HasManyAddAssociationMixin<User, number>;

  declare createBill: HasManyCreateAssociationMixin<Bill, "clinicId">;
  declare getBills: HasManyGetAssociationsMixin<Bill>;

  declare static associations: {
    bills: Association<Clinic, Bill>;
    appointments: Association<Clinic, Appointment>;
    patietPayments: Association<Clinic, PatientPayment>;
    patients: Association<Clinic, Patient>;
    clinic: Association<Clinic, User>;
    treatments: Association<Clinic, Treatment>;
  };
}

Clinic.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    telePhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    whatsappNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ownerName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    ownerAddress: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    ownerPhone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ownerEmail:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingStartTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "09:00:00",
    },
    workingEndTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "17:00:00",
    },
  },
  { tableName: "clinics", sequelize }
);

Patient.belongsToMany(Clinic, { through: "patient_clinic", as: "patients" });
Clinic.belongsToMany(Patient, { through: "patient_clinic", as: "patients" });
