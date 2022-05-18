import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { GetRedirects } from "./handler/GetRedirects.js"


export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            formatResponseSuccess(res, { redirects: await GetRedirects() })
        }
        catch (err) {
            formatResponseError(res, err)
        }
    })
}