import { formatResponseSuccess, formatResponseError } from "../../../helper/index.js"
export default function (app, path) {
    console.log(path)
    app.get(path, async (req, res) => {
        try {
            formatResponseSuccess(res, { sortedVideos: { data: "nothing" } })
        }
        catch (err) {
            formatResponseError(res, err)
        }
    })
}