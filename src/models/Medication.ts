import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Patient from "./Patient";
import { sequelize } from "../utils/sequlize-init";

export default class Medication extends Model<InferAttributes<Medication>, InferCreationAttributes<Medication>>{
    
    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare medicationList: string;
    declare allergyList: string; 
}

Medication.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    medicationList: {
        type: DataTypes.STRING(450),
    },
    allergyList: {
        type: DataTypes.STRING(450),
    }
}, {tableName: 'medications', sequelize})


Patient.hasOne(Medication, {
    foreignKey: {
        name: "PatientId",
        allowNull: false
    },
    as: "medications",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Medication.belongsTo(Patient);