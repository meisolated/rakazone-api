import { DataTypes } from "sequelize"
import sequelize from "./sequelize.js"


export const Videos = sequelize.define("tbl_videos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    videoId: DataTypes.STRING,
    platform : DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    publishedAt: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    viewCount: DataTypes.INTEGER,
    localViews : DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    commentCount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
}, {
    timestamps: false,
})

