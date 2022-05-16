

import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"


export const Videos = sequelize.define("tbl_videos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    videoId: DataTypes.STRING,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    publishedAt: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    viewCount: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    commentCount: DataTypes.INTEGER,
}, {
    timestamps: false,
})

