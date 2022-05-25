import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { Videos } from "../models/Videos.model.js"

export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            let data = await Videos.findAll()
            let empty = []
            data.forEach(element => {
                empty.push(element.dataValues)
            })
            formatResponseSuccess(res, { data })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
