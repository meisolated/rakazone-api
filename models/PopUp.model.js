import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"

export const PopUp = sequelize.define(
    "tbl_popup",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        message: DataTypes.STRING,
        close_btn_text: DataTypes.STRING,
        close_btn_redirect: DataTypes.STRING,
        once: DataTypes.STRING,
        expire: DataTypes.BIGINT,
        status: DataTypes.STRING,

    },
    {
        timestamps: false,
    }
)


