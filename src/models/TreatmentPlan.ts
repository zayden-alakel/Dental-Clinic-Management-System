import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import Patient from "./Patient";
import { sequelize } from "../utils/sequlize-init";
import CompletedTreatment from "./CompletedTreatment";
import PlanDetail from "./PlanDetail";

export default class TreatmentPlan extends Model<InferAttributes<TreatmentPlan>, InferCreationAttributes<TreatmentPlan>>{

    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare discount: number;
    declare sessionNumber: number;
    declare totalCost: number;
    declare isCompleted: boolean;
    //declare createdAt: Date;
    declare createdAt: CreationOptional<Date>;

    declare getDetails: HasManyGetAssociationsMixin<PlanDetail>;
    
    declare static associations :{
        completetreatments: Association<TreatmentPlan, CompletedTreatment>;
        details: Association<TreatmentPlan, PlanDetail>;
    }
}

TreatmentPlan.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    sessionNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalCost: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    isCompleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt:{
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {tableName: 'treatment_plans', sequelize})

Patient.hasMany(TreatmentPlan, {
    foreignKey:{
        allowNull: false,
    },
    as: "treatmentplans",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

TreatmentPlan.belongsTo(Patient);