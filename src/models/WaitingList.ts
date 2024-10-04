import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../utils/sequlize-init";
import Clinic from "./Clinic";
import Patient from "./Patient";

export default class WaitingList extends Model<
  InferAttributes<WaitingList>,
  InferCreationAttributes<WaitingList>
> {
  declare id: CreationOptional<number>;
  declare ClinicId: ForeignKey<Clinic["id"]>;
  declare PatientId: ForeignKey<Patient["id"]> | null;
  declare date: string;
  declare patientName: string;
  declare patientPhone: string;
}

WaitingList.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ClinicId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    PatientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
  {
    tableName: "waiting_lists",
    sequelize,
  }
);

Clinic.hasMany(WaitingList, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
WaitingList.belongsTo(Clinic);

Patient.hasMany(WaitingList, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
WaitingList.belongsTo(Patient, { foreignKey: { allowNull: true } });
