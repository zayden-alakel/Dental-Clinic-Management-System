import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Patient from "./Patient";
import Clinic from "./Clinic";
import TreatmentPlan from "./TreatmentPlan";
import { sequelize } from "../utils/sequlize-init";

export default class PatientPayment extends Model<InferAttributes<PatientPayment>, InferCreationAttributes<PatientPayment>>{

    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare ClinicId: ForeignKey<Clinic['id']>;
    declare TreatmentPlanId: ForeignKey<TreatmentPlan['id']>;
    declare amount: number;
    declare createdAt:Date;
}

PatientPayment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {tableName: 'patient_payments', sequelize})

Clinic.hasMany(PatientPayment,{
    foreignKey:{
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PatientPayment.belongsTo(Clinic);

Patient.hasMany(PatientPayment, {
    foreignKey:{
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PatientPayment.belongsTo(Patient);

TreatmentPlan.hasMany(PatientPayment, {
    foreignKey:{
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PatientPayment.belongsTo(TreatmentPlan);