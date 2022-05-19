import { Videos } from "../models/Videos.model.js"
import _ from "lodash"
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
        let _mostRecentIRL = await Videos.findAndCountAll({ where: { type: "irl" }, order: [["publishedAt", "DESC"]], limit })


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
        let mostRecentIRL = []

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
        _mostRecentIRL.rows.forEach((video) => {
            mostRecentIRL.push(video.dataValues)
        })

        let primaryArray = mostLikedVideo.concat(mostViewedVideo, mostRecentFunny, mostRecentShorts, mostRecentVlog, mostRecentIRL)

        let featuredPrimary = primaryArray[_.random(0, primaryArray.length - 1)]
        let featuredSecondary = primaryArray[_.random(0, primaryArray.length - 1)]
        let featuredTertiary = primaryArray[_.random(0, primaryArray.length - 1)]

        // add six videos to object
        let One = mostRecentVideo[0]
        let Two = mostViewedVideo[0]
        let Three = mostRecentFunny[0]
        let Four = mostRecentShorts[0]
        let Five = mostRecentVlog[0]
        let Six = mostRecentIRL[0]
        let latest = { One, Two, Three, Four, Five, Six }


        resolve({ featuredPrimary, featuredSecondary, featuredTertiary, latest })
    })
