import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { GetLiveData } from "./handler/GetLiveData.js"

export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            formatResponseSuccess(res, { liveData: await GetLiveData() })
        }
        catch (err) {
            formatResponseError(res, err)
        }
    })
}