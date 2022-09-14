import { Videos, WatchHistory } from "../models"
export default async function videosLogic(user?: any) {
    const videos: any = await Videos.find({ type: ["vlog", "funny", "live_stream", "irl"] })
    const sortRecent = (a: any, b: any) => a.publishedAt - b.publishedAt
    var localVideosList = videos.filter((video: any) => video.platform == "local")
    var vlogsList = videos.filter((video: any) => video.type == "vlog")
    var funnyList = videos.filter((video: any) => video.type == "funny")
    var recentLiveList = videos.filter((video: any) => video.type == "live_stream").sort(sortRecent)
    var irlList = videos.filter((video: any) => video.type == "irl")

    const ids: Array<String> = []
    if (user) {
        const userHistory = await WatchHistory.find({ userId: user })
        if (userHistory) userHistory.map((h: any) => ids.push(h.videoId))
    }

    return { localVideosList, vlogsList, funnyList, recentLiveList: recentLiveList[recentLiveList.length - 1], irlList, watchHistory: ids }
}
