import { DataTypes } from "sequelize"
import sequelize from "./sequelize.js"

export const WatchLog = sequelize.define(
 "tbl_watch_logs",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  user_id: DataTypes.INTEGER,
  playing: DataTypes.BOOLEAN,
  muted: DataTypes.BOOLEAN,
  volume: DataTypes.INTEGER,
  ts: DataTypes.STRING, // time spent
  ct: DataTypes.STRING, // current time
  vl: DataTypes.STRING, // video length
  vi: DataTypes.STRING, // video id
  platform: DataTypes.STRING,
  browser: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
