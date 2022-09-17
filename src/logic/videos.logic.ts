import { shuffle } from "../functions"
import { userProjection } from "../helpers"
import { Videos, WatchHistory } from "../models"
export default async function videosLogic(user?: any) {

    const sortRecent = (a: any, b: any) => a.publishedAt - b.publishedAt

    const videos: any = await Videos.find({ type: ["vlog", "funny", "live_stream", "irl"] }, userProjection)

    const ids: Array<String> = []
    if (user) {
        const userHistory = await WatchHistory.find({ userId: user })
        if (userHistory) userHistory.map((h: any) => ids.push(h.videoId))
    }


    const localVideosList = videos.filter((video: any) => video.platform == "local" && !ids.includes(video.videoId))
    const vlogsList = videos.filter((video: any) => video.type == "vlog" && !ids.includes(video.videoId))
    const funnyList = videos.filter((video: any) => video.type == "funny" && !ids.includes(video.videoId))
    const recentLiveList = videos.filter((video: any) => video.type == "live_stream" && !ids.includes(video.videoId)).sort(sortRecent)
    const irlList = videos.filter((video: any) => video.type == "irl" && !ids.includes(video.videoId))

    let primaryVideo = [localVideosList, vlogsList, funnyList][Math.floor(Math.random() * 3)]
    primaryVideo = primaryVideo[Math.floor(Math.random() * primaryVideo.length)]

    let secondaryVideo = [irlList, vlogsList][Math.floor(Math.random() * 2)]
    secondaryVideo = secondaryVideo[Math.floor(Math.random() * secondaryVideo.length)]

    let tertiaryVideo = [recentLiveList, irlList][Math.floor(Math.random() * 2)]
    tertiaryVideo = tertiaryVideo[Math.floor(Math.random() * tertiaryVideo.length)]

    const funnies = shuffle(funnyList).slice(0, 3)
    const locals = shuffle(localVideosList).slice(0, 3)

    const latestVideos = [recentLiveList[recentLiveList.length - 1], ...funnies, ...locals]

    return { primaryVideo, secondaryVideo, tertiaryVideo, latestVideos, watchHistory: ids }
}
