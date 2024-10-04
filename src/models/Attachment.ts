import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Patient from "./Patient";
import { sequelize } from "../utils/sequlize-init";

export default class Attachment extends Model<InferAttributes<Attachment>, InferCreationAttributes<Attachment>> {

    declare id: CreationOptional<number>;
    declare PatientId: ForeignKey<Patient['id']>;
    declare title: string;
    declare url: CreationOptional<string>;

}

Attachment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'attachments', sequelize })

Patient.hasMany(Attachment, {
    foreignKey: { allowNull: false }, as: "attachments", onDelete: 'CASCADE', onUpdate: 'CASCADE'
});
Attachment.belongsTo(Patient);