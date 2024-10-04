import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Patient from "./Patient";
import { sequelize } from "../utils/sequlize-init";

export default class Complaint extends Model<InferAttributes<Complaint>, InferCreationAttributes<Complaint>>{
    
    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare complaintText: string;
    declare consultation: string;
}

Complaint.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    complaintText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    consultation: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {tableName: 'complaints', sequelize});

Patient.hasMany(Complaint, {
    foreignKey: {
        allowNull: false,
    },
    as: 'complaints',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Complaint.belongsTo(Patient);