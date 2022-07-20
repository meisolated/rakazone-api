import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"


export const YoutubeAPI = sequelize.define("tbl_youtube_apis", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    key: DataTypes.STRING,
    utilization: DataTypes.INTEGER,

}, {
    timestamps: false,
})

