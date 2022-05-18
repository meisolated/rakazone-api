import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { GetStreamerData } from "./handler/GetStreamerData.js"

export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            formatResponseSuccess(res, { sortedVideos: await GetStreamerData() })
        }
        catch (err) {
            formatResponseError(res, err)
        }
    })
}