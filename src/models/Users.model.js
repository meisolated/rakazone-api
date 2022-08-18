import sequelize from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Users = sequelize.define(
 "tbl_users",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  user_id: DataTypes.STRING,
  login_type: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  profile_pic: DataTypes.STRING,
  created_on: DataTypes.BIGINT,
  last_login: DataTypes.BIGINT,
 },
 {
  timestamps: false,
 }
)
