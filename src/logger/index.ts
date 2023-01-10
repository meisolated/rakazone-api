import moment from "moment"
import winston from "winston"

const dateNtime = () => {
    let time = moment().format("DD-MM-YYYY hh:mm:ss")
    return time
}

var _logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize({
            all: true,
        }),
        winston.format.printf((data) => `[${dateNtime()}] [${data.level}] : ${data.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: "silly",
        }),
        new winston.transports.File({
            level: "silly",
            filename: "./log/ServerData.log",
        }),
    ],
})

var logger = {
    silly: (message: string) => {
        _logger.log("silly", message)
    },
    debug: (message: string) => {
        _logger.log("debug", message)
    },
    verbose: (message: string) => {
        _logger.log("verbose", message)
    },
    info: (message: string) => {
        _logger.log("info", message)
    },
    warn: (message: string) => {
        _logger.log("warn", message)
    },
    error: (message: string) => {
        _logger.log("error", message)
    },
}

export default logger
