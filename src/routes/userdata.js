import checkLogged from "../helper/checkLogged.js"
import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { Users } from "../models/Users.model.js"

export default function (app, path) {
    app.get(path, checkLogged, async (req, res) => {
        if (!req.user) return formatResponseError(res, { message: "You are not logged in", code: 401 })
        try {
            let user = await Users.findOne({ where: { user_id: req.user } }).then((user) => user.dataValues)
            formatResponseSuccess(res, { user })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
