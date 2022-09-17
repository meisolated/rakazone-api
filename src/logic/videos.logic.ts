import { userProjection } from "../helpers"
import { Videos, WatchHistory } from "../models"
export default async function videosLogic(user?: any) {
    const videos: any = await Videos.find({ type: ["vlog", "funny", "live_stream", "irl"] }, userProjection)
    const sortRecent = (a: any, b: any) => a.publishedAt - b.publishedAt
    const localVideosList = videos.filter((video: any) => video.platform == "local")
    const vlogsList = videos.filter((video: any) => video.type == "vlog")
    const funnyList = videos.filter((video: any) => video.type == "funny")
    const recentLiveList = videos.filter((video: any) => video.type == "live_stream").sort(sortRecent)
    const irlList = videos.filter((video: any) => video.type == "irl")

    let primaryVideo = [localVideosList, vlogsList, funnyList][Math.floor(Math.random() * 5)]
    primaryVideo = primaryVideo[Math.floor(Math.random() * primaryVideo.length)]

    let secondaryVideo = [irlList, vlogsList][Math.floor(Math.random() * 5)]
    secondaryVideo = secondaryVideo[Math.floor(Math.random() * secondaryVideo.length)]

    let tertiaryVideo = [recentLiveList, irlList][Math.floor(Math.random() * 5)]
    tertiaryVideo = tertiaryVideo[Math.floor(Math.random() * tertiaryVideo.length)]



    const ids: Array<String> = []
    if (user) {
        const userHistory = await WatchHistory.find({ userId: user })
        if (userHistory) userHistory.map((h: any) => ids.push(h.videoId))
    }


    return { primaryVideo, secondaryVideo, tertiaryVideo, recentLiveList: recentLiveList[recentLiveList.length - 1], watchHistory: ids }
}
