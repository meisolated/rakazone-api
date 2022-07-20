

import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"


export const Redirects = sequelize.define("tbl_redirects", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    from_where: DataTypes.STRING,
    to_where: DataTypes.STRING,

}, {
    timestamps: false,
})

