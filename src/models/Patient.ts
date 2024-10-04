import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../utils/sequlize-init";
import Disease from "./Disease";
import Medication from "./Medication";
import Complaint from "./Complaint";
import Attachment from "./Attachment";
import TreatmentPlan from "./TreatmentPlan";
import Appointment from "./Appointment";
import PatientPayment from "./PatientPayment";
import CompletedTreatment from "./CompletedTreatment";

export default class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare fullName: string;
  declare address: string;
  declare email: string;
  declare phoneNumber: string;
  declare age: number;
  declare gender: Gender;
  declare habits: string;
  declare birthDate: string;

  declare hasComplaint: HasManyHasAssociationMixin<Complaint, number>;
  declare getComplaints: HasManyGetAssociationsMixin<Complaint>;
  declare countComplaints: HasManyCountAssociationsMixin;

  declare getTreatmentplans: HasManyGetAssociationsMixin<TreatmentPlan>;

  declare getCompletedtreatments: HasManyGetAssociationsMixin<CompletedTreatment>;

  declare static associations: {
    diseases: Association<Patient, Disease>;
    medications: Association<Patient, Medication>;
    complaints: Association<Patient, Complaint>;
    attachments: Association<Patient, Attachment>;
    treatmentplans: Association<Patient, TreatmentPlan>;
    completedtreatments: Association<Patient, CompletedTreatment>;
    aapointments: Association<Patient, Appointment>;
    patientPayments: Association<Patient, PatientPayment>;
  };
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(32),
      unique: false,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE"),
      allowNull: false,
    },
    habits: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE(),
    },
  },
  { tableName: "patients", sequelize }
);

enum Gender {
  Male = "MALE",
  Female = "Female",
}

// enum Role{
//     Admin = "ADMIN",
//     Doctor = "DOCTOR",
//     Assisstane = "ASSISSTANE",
//     Secretary = "SECRETARY"
// }
