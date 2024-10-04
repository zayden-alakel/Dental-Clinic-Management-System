import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Patient from "./Patient";
import { sequelize } from "../utils/sequlize-init";

export default class Disease extends Model<InferAttributes<Disease>, InferCreationAttributes<Disease>>{
    
    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare diseaseList: string;
    declare notes: string;
}

Disease.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    diseaseList: {
        type: DataTypes.STRING(450),
    },
    notes: {
        type: DataTypes.STRING,
    }
}, {tableName: 'diseases', sequelize})

Patient.hasOne(Disease, {
    foreignKey: {
        allowNull: false,
        name: "PatientId"
    },
    as: 'diseases',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Disease.belongsTo(Patient);