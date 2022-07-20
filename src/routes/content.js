import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { GetSortedVideos } from "../handler/GetSortedVideos.js"
import { GetLiveData } from "../handler/GetLiveData.js"
import _ from "lodash"
export default function (app, path) {
    app.get(path, async (req, res) => {
        // let testingData = {
        //     sortedVideos: {
        //         featuredPrimary: {
        //             id: 6,
        //             videoId: "10INvndIT50",
        //             thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //             title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //             type: "live_stream",
        //             publishedAt: 1652824216,
        //             duration: 18692,
        //             viewCount: 131642,
        //             likeCount: 13119,
        //             commentCount: 202,
        //         },
        //         featuredSecondary: {
        //             id: 6,
        //             videoId: "10INvndIT50",
        //             thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //             title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //             type: "live_stream",
        //             publishedAt: 1652824216,
        //             duration: 18692,
        //             viewCount: 131642,
        //             likeCount: 13119,
        //             commentCount: 202,
        //         },
        //         featuredTertiary: {
        //             id: 4,
        //             videoId: "5Icidfc9uww",
        //             thumbnail: "https://i.ytimg.com/vi/5Icidfc9uww/mqdefault.jpg",
        //             title: "When Desi Boys Play GTA 5 | GTA 5 Funny Moment",
        //             type: "funny",
        //             publishedAt: 1649572200,
        //             duration: 46,
        //             viewCount: 68386,
        //             likeCount: 10657,
        //             commentCount: 330,
        //         },
        //         latest: {
        //             One: {
        //                 id: 6,
        //                 videoId: "10INvndIT50",
        //                 thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //                 title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //                 type: "live_stream",
        //                 publishedAt: 1652824216,
        //                 duration: 18692,
        //                 viewCount: 131642,
        //                 likeCount: 13119,
        //                 commentCount: 202,
        //             },
        //             Two: {
        //                 id: 6,
        //                 videoId: "10INvndIT50",
        //                 thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //                 title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //                 type: "live_stream",
        //                 publishedAt: 1652824216,
        //                 duration: 18692,
        //                 viewCount: 131642,
        //                 likeCount: 13119,
        //                 commentCount: 202,
        //             },
        //             Three: {
        //                 id: 6,
        //                 videoId: "10INvndIT50",
        //                 thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //                 title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //                 type: "live_stream",
        //                 publishedAt: 1652824216,
        //                 duration: 18692,
        //                 viewCount: 131642,
        //                 likeCount: 13119,
        //                 commentCount: 202,
        //             },
        //             Four: {
        //                 id: 6,
        //                 videoId: "10INvndIT50",
        //                 thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //                 title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //                 type: "live_stream",
        //                 publishedAt: 1652824216,
        //                 duration: 18692,
        //                 viewCount: 131642,
        //                 likeCount: 13119,
        //                 commentCount: 202,
        //             },
        //             Five: {
        //                 id: 6,
        //                 videoId: "10INvndIT50",
        //                 thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //                 title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //                 type: "live_stream",
        //                 publishedAt: 1652824216,
        //                 duration: 18692,
        //                 viewCount: 131642,
        //                 likeCount: 13119,
        //                 commentCount: 202,
        //             },
        //             Six: {
        //                 id: 6,
        //                 videoId: "10INvndIT50",
        //                 thumbnail: "https://i.ytimg.com/vi/10INvndIT50/mqdefault.jpg",
        //                 title: "Promoted as an Officer in GTA 5  | COP RP in GTA 5 Live Stream India",
        //                 type: "live_stream",
        //                 publishedAt: 1652824216,
        //                 duration: 18692,
        //                 viewCount: 131642,
        //                 likeCount: 13119,
        //                 commentCount: 202,
        //             },
        //         },
        //     },
        // }
        try {
            let sortedVideos = await GetSortedVideos()
            let liveData = await GetLiveData()
            let featuredPrimary = liveData.status == "live" ? liveData : sortedVideos.featuredPrimary
            sortedVideos.featuredPrimary = featuredPrimary
            formatResponseSuccess(res, { sortedVideos })

            // let liveData = await GetLiveData()
            // let featuredPrimary = liveData.status == "live" ? liveData : testingData.featuredPrimary
            // testingData.featuredPrimary = featuredPrimary
            // formatResponseSuccess(res, { sortedVideos: testingData.sortedVideos })

        } catch (err) {
            formatResponseError(res, err)
        }
    })
}
