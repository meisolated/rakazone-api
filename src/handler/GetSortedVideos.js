import _ from "lodash"
import { Op } from "sequelize"
import myCache from "../helper/cache.js"
import { Videos } from "../models/Videos.model.js"

// TODO: get all videos at once then sort them, remove caching
export const GetSortedVideos = () =>
    new Promise(async (resolve, reject) => {
        let limit = 10
        var {
            _mostLikedVideo,
            _mostViewedVideo,
            _mostCommentedVideo,
            _mostRecentVideo,
            _mostRecentLiveStream,
            _mostRecentSeries,
            _mostRecentMontage,
            _mostRecentFunny,
            _mostRecentShorts,
            _mostRecentVlog,
            _mostRecentIRL,
            _under10min,
            _localVideos
        } = {}

        if (
            myCache.has("videos")
        ) {
            let videos = myCache.get("videos")
            _mostLikedVideo = videos._mostLikedVideo
            _mostViewedVideo = videos._mostViewedVideo
            _mostCommentedVideo = videos._mostCommentedVideo
            _mostRecentVideo = videos._mostRecentVideo
            _mostRecentLiveStream = videos._mostRecentLiveStream
            _mostRecentSeries = videos._mostRecentSeries
            _mostRecentMontage = videos._mostRecentMontage
            _mostRecentFunny = videos._mostRecentFunny
            _mostRecentShorts = videos._mostRecentShorts
            _mostRecentVlog = videos._mostRecentVlog
            _mostRecentIRL = videos._mostRecentIRL
            _under10min = videos._under10min
            _localVideos = videos._localVideos

        } else {
            _mostLikedVideo = await Videos.findAndCountAll({ raw: true, order: [["likeCount", "DESC"]], limit }).then(data => data.rows)
            _mostViewedVideo = await Videos.findAndCountAll({ raw: true, order: [["viewCount", "DESC"]], limit }).then(data => data.rows)
            _mostCommentedVideo = await Videos.findAndCountAll({ raw: true, order: [["commentCount", "DESC"]], limit }).then(data => data.rows)
            _mostRecentVideo = await Videos.findAndCountAll({ raw: true, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentLiveStream = await Videos.findAndCountAll({ raw: true, where: { type: "live_stream" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentSeries = await Videos.findAndCountAll({ raw: true, where: { type: "series" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentMontage = await Videos.findAndCountAll({ raw: true, where: { type: "montage" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentFunny = await Videos.findAndCountAll({ raw: true, where: { type: "funny" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentShorts = await Videos.findAndCountAll({ raw: true, where: { type: "shorts" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentVlog = await Videos.findAndCountAll({ raw: true, where: { type: "vlog" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _mostRecentIRL = await Videos.findAndCountAll({ raw: true, where: { type: "irl" }, order: [["publishedAt", "DESC"]], limit }).then(data => data.rows)
            _under10min = await Videos.findAndCountAll({ raw: true, where: { duration: { [Op.lt]: 600, [Op.gt]: 60 } }, order: [["publishedAt", "DESC"]], limit: 200 }).then(data => data.rows)
            _localVideos = await Videos.findAndCountAll({ raw: true, where: { platform: "local" } }).then(data => data.rows)
            myCache.set("videos", {
                _mostLikedVideo,
                _mostViewedVideo,
                _mostCommentedVideo,
                _mostRecentVideo,
                _mostRecentLiveStream,
                _mostRecentSeries,
                _mostRecentMontage,
                _mostRecentFunny,
                _mostRecentShorts,
                _mostRecentVlog,
                _mostRecentIRL,
                _under10min,
                _localVideos
            })
        }


        let primaryArray = _mostLikedVideo.concat(_mostViewedVideo, _mostRecentFunny, _mostRecentShorts, _mostRecentVlog, _mostRecentIRL, _under10min, _localVideos)
        let featuredPrimary = primaryArray[_.random(0, primaryArray.length - 1)]
        let featuredSecondary = primaryArray[_.random(0, primaryArray.length - 1)]
        let featuredTertiary = primaryArray[_.random(0, primaryArray.length - 1)]

        // add six videos to object
        let One = _localVideos[_.random(0, _localVideos.length - 1)]
        let Two = _localVideos[_.random(0, _localVideos.length - 1)]
        let Three = _localVideos[_.random(0, _localVideos.length - 1)]
        let Four = _mostRecentShorts[0]
        let Five = _mostRecentVlog[0]
        let Six = _mostRecentIRL[0]
        let latest = { One, Two, Three, Four, Five, Six }

        let data = { featuredPrimary, featuredSecondary, featuredTertiary, latest }
        resolve(data)
    })
