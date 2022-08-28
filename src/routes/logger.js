import axios from "axios"
import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { Logger } from "../models/Logger.model.js"
export default function (app, path) {
    app.post(path, async (req, res) => {
        // const { ip, city, region, country, postal, timezone, isp_address, req_type } = req.body
        const { ip, req_type } = req.body
        const doesExists = Logger.findOne({ where: { ip } })
        if (doesExists) return formatResponseSuccess(res, {})
        if (typeof ip == undefined || typeof req_type == undefined) return formatResponseError(res, { message: "Missing fields", status: 400 })
        try {
            axios
                .get(`https://ipinfo.io/${ip}/json?token=521776efe64505`)
                .catch(() => {
                    return formatResponseError(res, { message: "Something went wrong", status: "200" })
                })
                .then(async ({ data }) => {
                    const timestamp = Date.now()
                    await Logger.create({ ip, city: data.city, region: data.region, country: data.country, postal: data.postal, timezone: data.timezone, isp_address: data.org, req_type, timestamp })
                        .then(() => {
                            return formatResponseSuccess(res, {})
                        })
                        .catch((e) => {
                            return formatResponseError(res, { message: "Something went wrong", status: "200" })
                        })
                })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
