import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Bill from "./Bill";
import { sequelize } from "../utils/sequlize-init";

export default class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {

    declare id: CreationOptional<number>;
    declare BillId: ForeignKey<Bill['id']>;
    declare amount: number;
    declare createdAt: Date;
}

Payment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {tableName: 'payments', sequelize})

Bill.hasMany(Payment, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Payment.belongsTo(Bill);