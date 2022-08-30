import "dotenv/config"
import { Sequelize } from "sequelize"
import LoggerUtil from "../util/logger.js"


let DATABASE = (process.env.NODE_ENV === "production") ? process.env.DATABASE : process.env.DEVDATABASE
let LOGGING = (process.env.NODE_ENV === "production") ? false : (msg) => LoggerUtil.info(msg)
var sequelize = new Sequelize(DATABASE, process.env.DBUSER, process.env.PASS, {
    host: process.env.HOST,
    dialect: "mysql",
    logging: LOGGING,
})

export default sequelize
