import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Treatment from "./Treatment";
import { sequelize } from "../utils/sequlize-init";
import Patient from "./Patient";
import TreatmentPalace from "../utils/TreatmentPlace";


export default class CompletedTreatment extends Model<InferAttributes<CompletedTreatment>, InferCreationAttributes<CompletedTreatment>>{

    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare treatmentId: ForeignKey<Treatment['id']>;
    declare fromTeeth: number;
    declare toTeeth: number;
    declare place: TreatmentPalace;
    declare notes: string;

    declare static associations :{
        treatment: Association<CompletedTreatment, Treatment>
    }
}

CompletedTreatment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    fromTeeth: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    toTeeth: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    place:{
        type: DataTypes.ENUM('tooth', 'gums', 'mouth'),
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {tableName: 'completed_treatments', sequelize})

Treatment.hasMany(CompletedTreatment, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
CompletedTreatment.belongsTo(Treatment, {as: "treatment"});

Patient.hasMany(CompletedTreatment, {
    foreignKey: {
        allowNull: false,
    },
    as: 'completedtreatments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
CompletedTreatment.belongsTo(Patient);