import axios from "axios"
import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { Logger } from "../models/Logger.model.js"
export default function (app, path) {
    app.post(path, async (req, res) => {
        // const { ip, city, region, country, postal, timezone, isp_address, req_type } = req.body
        formatResponseSuccess(res, {})
        const { ip, req_type } = req.body
        const doesExists = await Logger.findOne({ where: { ip } })
        if (doesExists) return
        if (typeof ip == undefined || typeof req_type == undefined) return formatResponseError(res, { message: "Missing fields", status: 400 })
        try {
            axios
                .get(`https://ipinfo.io/${ip}/json?token=521776efe64505`)
                .catch(() => {
                    // return formatResponseError(res, { message: "Something went wrong", status: "200" })
                })
                .then(async ({ data }) => {
                    console.log(data)
                    const timestamp = Date.now()
                    Logger.create({ ip, city: data.city, region: data.region, country: data.country, postal: data.postal, timezone: data.timezone, isp_address: data.org, req_type, timestamp }).catch(e => {
                        console.log(e)
                    })
                })
        } catch (err) {
            // formatResponseError(res, err)
        }
    })
}
