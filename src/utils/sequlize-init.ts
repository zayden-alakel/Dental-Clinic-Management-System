import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(
    
    process.env.MYSQL_DBNAME as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.HOST as string,
        dialect: 'mysql'
    }
)