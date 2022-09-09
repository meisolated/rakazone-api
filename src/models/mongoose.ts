import mongoose from "mongoose"
import config from "../config"

export default class Mongoose {
    private uri: string
    constructor() {
        this.uri = config.mongoUri
    }
    connection() {
        return mongoose.createConnection(this.uri)
    }
}
