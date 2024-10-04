import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"
import { sequelize } from "../utils/sequlize-init";
import Roles from "../utils/Roles";
import Clinic from "./Clinic";

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{

    declare id: CreationOptional<number>;
    declare ClinicId: ForeignKey<Clinic['id']>;
    declare fullName: string;
    declare email: string;
    declare address: string;
    declare phoneNumber: string;
    declare password: string;
    declare role: CreationOptional<Roles>;
    declare token: NonAttribute<string>;

    declare static associations: {
        clinic: Association<User, Clinic>;
    };
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'doctor', 'assistant', 'secretary'),
        defaultValue: 'doctor'
    }
}, {modelName: 'users', sequelize})

Clinic.hasMany(User, {
    foreignKey:{
        allowNull: false
    },
    as: 'employees',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.belongsTo(Clinic, {as: 'clinic'});