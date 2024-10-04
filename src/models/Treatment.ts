import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Clinic from "./Clinic";
import { sequelize } from "../utils/sequlize-init";

export default class Treatment extends Model<InferAttributes<Treatment>, InferCreationAttributes<Treatment>>{

    declare id: CreationOptional<number>;
    declare ClinicId: ForeignKey<Clinic['id']>;
    declare title: string;
    declare category: string;
    declare defaultCost: number;
    declare description: string;
    declare color: string
}

Treatment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    defaultCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    description: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    color: {
        type: DataTypes.STRING(),
        allowNull: true
    }
}, {modelName: 'treatments', sequelize})

Clinic.hasMany(Treatment, {
    foreignKey:{
        allowNull: false,
    },
    as: "treatments",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Treatment.belongsTo(Clinic);