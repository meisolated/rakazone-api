import { sleep } from "../functions/funtions.js"
import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { PopUp } from "../models/PopUp.model.js"

export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            // { where: { status: "active", id: 1 } }
            let popups = await PopUp.findAll()
            return formatResponseSuccess(res, { popups: popups[0].dataValues })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
