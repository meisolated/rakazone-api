import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"

export const StreamerData = sequelize.define(
    "tbl_streamer_data",
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        data: DataTypes.STRING,
        last_update: DataTypes.INTEGER,


    },
    {
        timestamps: false,
    }
)



