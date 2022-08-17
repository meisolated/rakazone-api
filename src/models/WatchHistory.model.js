import { DataTypes } from "sequelize"
import sequelize from "./sequelize.js"


export const WatchHistory = sequelize.define("tbl_watch_history", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    video_id: DataTypes.INTEGER,
    created_at: DataTypes.STRING,
    modified_at: DataTypes.STRING,
}, {
    timestamps: false,
})

