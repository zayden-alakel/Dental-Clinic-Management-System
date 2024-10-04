import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Clinic from "./Clinic";
import { sequelize } from "../utils/sequlize-init";
import Payment from "./Payment";

export default class Bill extends Model<InferAttributes<Bill>, InferCreationAttributes<Bill>>{

    declare id: CreationOptional<number>;
    declare clinicId: ForeignKey<Clinic['id']>;
    declare type: BillType;
    declare total: number;
    declare content: string;
    declare provider: string;
    declare createdAt: Date;

    declare static associations :{
        payments: Association<Bill, Payment>
    }
}

Bill.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('MATERIALS', 'PROSTHETICS', 'OTHER'),
      allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {tableName: 'bills', sequelize})

Clinic.hasMany(Bill, {
    foreignKey: {
        allowNull: false
    },
    as: 'bills',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Bill.belongsTo(Clinic);

enum BillType{
    Materials = "MATERIALS",
    Prosthetics = "PROSTHETICS",
    Other = "OTHER"
}