import { formatResponseSuccess, formatResponseError } from "../helper/index.js"

import { GetSortedVideos } from "../handler/GetSortedVideos.js"

export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            formatResponseSuccess(res, { sortedVideos: await GetSortedVideos() })
        }
        catch (err) {
            formatResponseError(res, err)
        }
    })
}