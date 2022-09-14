import { Request, Response } from "express"
import { Analytics } from "../models"
import { _analytics } from "./../models/analytics.model"

export default function (app: any, path: any) {
    console.log("Loaded route: " + path)
    app.post(path, async (req: Request, res: Response) => {
        const { ip, city, region, country, postal, timezone, ispAddress, page, referrer, deviceWidth, deviceHeight, deviceName, deviceColorDepth, deviceOSName, deviceOSVersion, browserName, browserHeight, browserVersion, browserWidth }: _analytics =
            req.body
        if (!ip) return res.send({ message: "Invalid Request" })
        const timestamp = Date.now()
        Analytics.create({
            ip,
            city,
            region,
            country,
            postal,
            timezone,
            ispAddress,
            page,
            referrer,
            deviceWidth,
            deviceHeight,
            deviceName,
            deviceColorDepth,
            deviceOSName,
            deviceOSVersion,
            browserHeight,
            browserName,
            browserVersion,
            browserWidth,
            timestamp: timestamp,
        })
            .then(() => {})
            .catch((e) => {
                console.log(e)
            })

        return res.json({})
    })
}
