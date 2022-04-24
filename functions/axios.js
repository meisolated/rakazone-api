import axios from "axios"
import { throwError } from "./funtions.js"

/**
 *
 * @param {*} url
 * @returns response of said URL
 */
const axios_simple_get = (url) =>
    new Promise((reslove, reject) => {
        axios
            .get(url)
            .then(async ({ data }) => {
                return reslove(data)
            })
            .catch((err) => reject(throwError(err)))
    })

export { axios_simple_get }
