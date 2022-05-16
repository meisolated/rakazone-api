import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"


export const Settings = sequelize.define("tbl_settings", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    check_in: DataTypes.INTEGER,
    check_in_if_live: DataTypes.INTEGER,
    update_user_data_duration: DataTypes.INTEGER,

}, {
    timestamps: false,
})

