import _ from "lodash"
import { GetLiveData } from "../handler/GetLiveData.js"
import { GetSortedVideos } from "../handler/GetSortedVideos.js"
import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            let sortedVideos = await GetSortedVideos()
            let liveData = await GetLiveData()
            let featuredPrimary = liveData.status == "live" ? liveData : sortedVideos.featuredPrimary
            sortedVideos.featuredPrimary = featuredPrimary
            formatResponseSuccess(res, { ...sortedVideos })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
