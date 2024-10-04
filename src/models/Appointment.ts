import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Patient from "./Patient";
import Clinic from "./Clinic";
import { sequelize } from "../utils/sequlize-init";

export default class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare PatientId: ForeignKey<Patient["id"]> | null;
  declare ClinicId: ForeignKey<Clinic["id"]>;
  declare date: string;
  declare startTime: string;
  declare endTime: string;
  declare complaint: string;
  declare patientName: string;
  declare patientPhone: string;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME(),
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME(),
      allowNull: false,
    },
    complaint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "appointments", sequelize }
);

Clinic.hasMany(Appointment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Appointment.belongsTo(Clinic);

Patient.hasMany(Appointment, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Appointment.belongsTo(Patient, { foreignKey: { allowNull: true } });
