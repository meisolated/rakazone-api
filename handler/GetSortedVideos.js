import { Videos } from "../models/Videos.model.js"
import _ from "lodash"
import myCache from "../helper/cache.js"
export const GetSortedVideos = () =>
    new Promise(async (resolve, reject) => {

        if (myCache.get("GetSortedVideos") === null || myCache.get("GetSortedVideos") === undefined) {
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
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostLikedVideo.push(video.dataValues)
            })
            _mostViewedVideo.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostViewedVideo.push(video.dataValues)
            })
            _mostCommentedVideo.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostCommentedVideo.push(video.dataValues)
            })
            _mostRecentVideo.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentVideo.push(video.dataValues)
            })
            _mostRecentLiveStream.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentLiveStream.push(video.dataValues)
            })
            _mostRecentSeries.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentSeries.push(video.dataValues)
            })
            _mostRecentMontage.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentMontage.push(video.dataValues)
            })
            _mostRecentFunny.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentFunny.push(video.dataValues)
            })
            _mostRecentShorts.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentShorts.push(video.dataValues)
            })
            _mostRecentVlog.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentVlog.push(video.dataValues)
            })
            _mostRecentIRL.rows.forEach((video) => {
                // video.dataValues.thumbnail = `https://i.ytimg.com/vi/${video.dataValues.videoId}/mqdefault.jpg`
                mostRecentIRL.push(video.dataValues)
            })

            let primaryArray = mostLikedVideo.concat(mostViewedVideo, mostRecentFunny, mostRecentShorts, mostRecentVlog, mostRecentIRL)

            let featuredPrimary = primaryArray[_.random(0, primaryArray.length - 1)]
            // featuredPrimary.thumbnail = `https://i.ytimg.com/vi/${featuredPrimary.videoId}/maxresdefault.jpg`
            let featuredSecondary = primaryArray[_.random(0, primaryArray.length - 1)]
            // featuredSecondary.thumbnail = `https://i.ytimg.com/vi/${featuredSecondary.videoId}/maxresdefault.jpg`
            let featuredTertiary = primaryArray[_.random(0, primaryArray.length - 1)]
            // featuredTertiary.thumbnail = `https://i.ytimg.com/vi/${featuredTertiary.videoId}/maxresdefault.jpg`

            // add six videos to object
            let One = mostRecentVideo[0]
            let Two = mostViewedVideo[0]
            let Three = mostRecentFunny[0]
            let Four = mostRecentShorts[0]
            let Five = mostRecentVlog[0]
            let Six = mostRecentIRL[0]
            let latest = { One, Two, Three, Four, Five, Six }

            let data = { featuredPrimary, featuredSecondary, featuredTertiary, latest }
            myCache.set("GetSortedVideos", data, 60 * 60 * 24)
            resolve(data)
        } else {
            resolve(myCache.get("GetSortedVideos"))
        }
    })
