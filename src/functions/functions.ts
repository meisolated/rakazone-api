import logger from "../logger"

export function convertToInternationalCurrencySystem(labelValue: number) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
        : Math.abs(Number(labelValue))
}

export function sleep(ms: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function throwError(err: any) {
    logger.error(JSON.stringify(err))
    return err
}

export const UrlExists = (url: any) =>
    new Promise((resolve, reject) => {
        fetch(url, { method: "head" }).then(function (status) {
            resolve(status.ok)
        })
    })
