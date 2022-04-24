
import moment from "moment"
import LoggerUtil from "../util/logger.js"

export const updateORnot = (last_update, next_update) => {
    if (!time) return true
    if ((last_update + next_update) < Date.now()) return true
    return false
}

export const dateNtime = () => {
    let time = moment().format("DD-MM-YYYY hh:mm:ss", true)
    return time
}

export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function throwError(err) {
    LoggerUtil.error(JSON.stringify(err))
    return err
}






export function convertToInternationalCurrencySystem(labelValue) {

    // Nine Zeroes for Billions
    let value = Math.abs(Number(labelValue)) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(0) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(0) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(0) + "K"

                : Math.abs(Number(labelValue))

    return value

}
