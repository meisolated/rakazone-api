import checkLogged from "../helper/checkLogged.js"
import { formatResponseSuccess, formatResponseError } from "../helper/index.js"

export default function (app, path) {
    app.get(path, checkLogged, async (req, res) => {
        try {
            formatResponseSuccess(res, { status: "User is logged in " })
        }
        catch (err) {
            formatResponseError(res, err)
        }
    })
}