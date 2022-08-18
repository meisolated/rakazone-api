import { DataTypes } from "sequelize"
import sequelize from "./sequelize.js"

export const WatchHistory = sequelize.define(
 "tbl_watch_histories",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  user_id: DataTypes.INTEGER,
  video_id: DataTypes.STRING,
  created_at: DataTypes.STRING,
  modified_at: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
