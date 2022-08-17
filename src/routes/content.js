import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { GetSortedVideos } from "../handler/GetSortedVideos.js"
import { GetLiveData } from "../handler/GetLiveData.js"
import _ from "lodash"
export default function (app, path) {
    app.get(path, async (req, res) => {
        try {
            let sortedVideos = await GetSortedVideos()
            let liveData = await GetLiveData()
            let featuredPrimary = liveData.status == "live" ? liveData : sortedVideos.featuredPrimary
            sortedVideos.featuredPrimary = featuredPrimary
            formatResponseSuccess(res, { sortedVideos })
        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
