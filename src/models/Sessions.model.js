import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Sessions = sequelize.define(
 "tbl_sessions",
 {
  session_id: { type: DataTypes.STRING, primaryKey: true },
  expires: DataTypes.INTEGER,
  data: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
