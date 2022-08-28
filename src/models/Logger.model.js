
import { DataTypes } from "sequelize"
import sequelize from "./sequelize.js"

export const Logger = sequelize.define(
    "tbl_loggers",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        // type: DataTypes.STRING,
        ip: DataTypes.STRING,
        city: DataTypes.STRING,
        region: DataTypes.STRING,
        country: DataTypes.STRING,
        postal: DataTypes.STRING,
        timezone: DataTypes.BIGINT,
        isp_address: DataTypes.STRING,
        req_type: DataTypes.STRING,
        timestamp: DataTypes.STRING,
    },
    {
        timestamps: false,
    }
)


