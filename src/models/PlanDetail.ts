import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import TreatmentPlan from "./TreatmentPlan";
import { sequelize } from "../utils/sequlize-init";
import Treatment from "./Treatment";
import TreatmentPalace from "../utils/TreatmentPlace";

export default class PlanDetail extends Model<InferAttributes<PlanDetail>, InferCreationAttributes<PlanDetail>>{

    declare id: CreationOptional<number>;
    declare TreatmentPlanId: ForeignKey<TreatmentPlan['id']>;
    declare fromTeeth: number;
    declare toTeeth: number;
    declare place: TreatmentPalace 
    declare cost: number;
    declare treatmentId: NonAttribute<number>;

    declare addTreatment: HasManyAddAssociationMixin<Treatment, number>;

    declare static associations :{
        treatments: Association<PlanDetail, Treatment>;
    };
}

PlanDetail.init({
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
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {tableName: 'plan_details', sequelize})

TreatmentPlan.hasMany(PlanDetail, {
    foreignKey: {
        allowNull: false
    },
    as: "details",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
PlanDetail.belongsTo(TreatmentPlan);

PlanDetail.belongsToMany(Treatment, {through: 'plan_detail_treatments', as: "treatments"});
Treatment.belongsToMany(PlanDetail, {through: 'plan_detail_treatments', as: "treatments"});