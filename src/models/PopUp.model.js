import { DataTypes } from "sequelize"
import sequelize from "./sequelize.js"

export const PopUp = sequelize.define(
    "tbl_popup",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        // type: DataTypes.STRING,
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


