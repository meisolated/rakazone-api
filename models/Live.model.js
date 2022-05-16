import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Live = sequelize.define(
    "tbl_lives",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        link: DataTypes.STRING,
        platform: DataTypes.STRING,
        videoId: DataTypes.STRING,
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        viewers_count: DataTypes.INTEGER,
        publishedAt: DataTypes.INTEGER,
        status: DataTypes.STRING,
        last_update: DataTypes.INTEGER,
    },
    {
        timestamps: false,
    }, {
    setterMethods: {
        updateLive(data) {
            console.log("testing updateLive")
        }
    }
}
)


