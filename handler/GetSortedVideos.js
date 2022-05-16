import { sleep } from "../functions/funtions.js"
import { Videos } from "../models/Videos.model.js"

export const GetSortedVideos = () => new Promise(async (resolve, reject) => {
    let limit = 5
    let mostLikedVideo = await Videos.findAndCountAll({ order: [["likeCount", "DESC"]], limit })
    let mostViewedVideo = await Videos.findAndCountAll({ order: [["viewCount", "DESC"]], limit })
    let mostCommentedVideo = await Videos.findAndCountAll({ order: [["commentCount", "DESC"]], limit })
    let mostRecentVideo = await Videos.findAndCountAll({ order: [["publishedAt", "DESC"]], limit })
    let mostRecentLiveStream = await Videos.findAndCountAll({ where: { type: "live_stream" }, order: [["publishedAt", "DESC"]], limit })
    let mostRecentSeries = await Videos.findAndCountAll({ where: { type: "series" }, order: [["publishedAt", "DESC"]], limit })
    let mostRecentMontage = await Videos.findAndCountAll({ where: { type: "montage" }, order: [["publishedAt", "DESC"]], limit })
    let mostRecentFunny = await Videos.findAndCountAll({ where: { type: "funny" }, order: [["publishedAt", "DESC"]], limit })
    let mostRecentShorts = await Videos.findAndCountAll({ where: { type: "shorts" }, order: [["publishedAt", "DESC"]], limit })
    let mostRecentVlog = await Videos.findAndCountAll({ where: { type: "vlog" }, order: [["publishedAt", "DESC"]], limit })

    let _mostLikedVideo = []
    let _mostViewedVideo = []
    let _mostCommentedVideo = []
    let _mostRecentVideo = []
    let _mostRecentLiveStream = []
    let _mostRecentSeries = []
    let _mostRecentMontage = []
    let _mostRecentFunny = []
    let _mostRecentShorts = []
    let _mostRecentVlog = []

    mostLikedVideo = mostLikedVideo.rows.forEach(video => {
        _mostLikedVideo.push(video.dataValues)
    })
    mostViewedVideo = mostViewedVideo.rows.forEach(video => {
        _mostViewedVideo.push(video.dataValues)
    })
    mostCommentedVideo = mostCommentedVideo.rows.forEach(video => {
        _mostCommentedVideo.push(video.dataValues)
    })
    mostRecentVideo = mostRecentVideo.rows.forEach(video => {
        _mostRecentVideo.push(video.dataValues)
    })
    mostRecentLiveStream = mostRecentLiveStream.rows.forEach(video => {
        _mostRecentLiveStream.push(video.dataValues)
    })
    mostRecentSeries = mostRecentSeries.rows.forEach(video => {
        _mostRecentSeries.push(video.dataValues)
    })
    mostRecentMontage = mostRecentMontage.rows.forEach(video => {
        _mostRecentMontage.push(video.dataValues)
    })
    mostRecentFunny = mostRecentFunny.rows.forEach(video => {
        _mostRecentFunny.push(video.dataValues)
    })
    mostRecentShorts = mostRecentShorts.rows.forEach(video => {
        _mostRecentShorts.push(video.dataValues)
    })
    mostRecentVlog = mostRecentVlog.rows.forEach(video => {
        _mostRecentVlog.push(video.dataValues)
    })

    resolve({ _mostLikedVideo, _mostViewedVideo, _mostCommentedVideo, _mostRecentVideo, _mostRecentLiveStream, _mostRecentSeries, _mostRecentMontage, _mostRecentFunny, _mostRecentShorts, _mostRecentVlog })
}
)