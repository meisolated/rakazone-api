import { Videos } from "../models/Videos.model.js"

export const GetSortedVideos = () =>
    new Promise(async (resolve, reject) => {
        let limit = 5
        let _mostLikedVideo = await Videos.findAndCountAll({ order: [["likeCount", "DESC"]], limit })
        let _mostViewedVideo = await Videos.findAndCountAll({ order: [["viewCount", "DESC"]], limit })
        let _mostCommentedVideo = await Videos.findAndCountAll({ order: [["commentCount", "DESC"]], limit })
        let _mostRecentVideo = await Videos.findAndCountAll({ order: [["publishedAt", "DESC"]], limit })
        let _mostRecentLiveStream = await Videos.findAndCountAll({ where: { type: "live_stream" }, order: [["publishedAt", "DESC"]], limit })
        let _mostRecentSeries = await Videos.findAndCountAll({ where: { type: "series" }, order: [["publishedAt", "DESC"]], limit })
        let _mostRecentMontage = await Videos.findAndCountAll({ where: { type: "montage" }, order: [["publishedAt", "DESC"]], limit })
        let _mostRecentFunny = await Videos.findAndCountAll({ where: { type: "funny" }, order: [["publishedAt", "DESC"]], limit })
        let _mostRecentShorts = await Videos.findAndCountAll({ where: { type: "shorts" }, order: [["publishedAt", "DESC"]], limit })
        let _mostRecentVlog = await Videos.findAndCountAll({ where: { type: "vlog" }, order: [["publishedAt", "DESC"]], limit })

        let mostLikedVideo = []
        let mostViewedVideo = []
        let mostCommentedVideo = []
        let mostRecentVideo = []
        let mostRecentLiveStream = []
        let mostRecentSeries = []
        let mostRecentMontage = []
        let mostRecentFunny = []
        let mostRecentShorts = []
        let mostRecentVlog = []

        _mostLikedVideo.rows.forEach((video) => {
            mostLikedVideo.push(video.dataValues)
        })
        _mostViewedVideo.rows.forEach((video) => {
            mostViewedVideo.push(video.dataValues)
        })
        _mostCommentedVideo.rows.forEach((video) => {
            mostCommentedVideo.push(video.dataValues)
        })
        _mostRecentVideo.rows.forEach((video) => {
            mostRecentVideo.push(video.dataValues)
        })
        _mostRecentLiveStream.rows.forEach((video) => {
            mostRecentLiveStream.push(video.dataValues)
        })
        _mostRecentSeries.rows.forEach((video) => {
            mostRecentSeries.push(video.dataValues)
        })
        _mostRecentMontage.rows.forEach((video) => {
            mostRecentMontage.push(video.dataValues)
        })
        _mostRecentFunny.rows.forEach((video) => {
            mostRecentFunny.push(video.dataValues)
        })
        _mostRecentShorts.rows.forEach((video) => {
            mostRecentShorts.push(video.dataValues)
        })
        _mostRecentVlog.rows.forEach((video) => {
            mostRecentVlog.push(video.dataValues)
        })

        resolve({
            mostLikedVideo, mostViewedVideo, mostCommentedVideo, mostRecentVideo, mostRecentLiveStream, mostRecentSeries, mostRecentMontage, mostRecentFunny, mostRecentShorts, mostRecentVlog,
        })
    })
