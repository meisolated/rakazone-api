import mongoose from "mongoose"
import config from "../config"
const connection = mongoose.createConnection(config.mongoUri)
export default connection
