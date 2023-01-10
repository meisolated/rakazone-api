import { Videos } from "../models"

export const GetSortedVideos = () =>
    new Promise(async (resolve, reject) => {
        let limit = 5
        let mostLikedVideo: any = await Videos.count({ order: [["likeCount", "DESC"]], limit })
        let mostViewedVideo: any = await Videos.count({ order: [["viewCount", "DESC"]], limit })
        let mostCommentedVideo: any = await Videos.count({ order: [["commentCount", "DESC"]], limit })
        let mostRecentVideo: any = await Videos.count({ order: [["publishedAt", "DESC"]], limit })
        let mostRecentLiveStream: any = await Videos.count({ where: { type: "live_stream" }, order: [["publishedAt", "DESC"]], limit })
        let mostRecentSeries: any = await Videos.count({ where: { type: "series" }, order: [["publishedAt", "DESC"]], limit })
        let mostRecentMontage: any = await Videos.count({ where: { type: "montage" }, order: [["publishedAt", "DESC"]], limit })
        let mostRecentFunny: any = await Videos.count({ where: { type: "funny" }, order: [["publishedAt", "DESC"]], limit })
        let mostRecentShorts: any = await Videos.count({ where: { type: "shorts" }, order: [["publishedAt", "DESC"]], limit })
        let mostRecentVlog: any = await Videos.count({ where: { type: "vlog" }, order: [["publishedAt", "DESC"]], limit })

        let _mostLikedVideo: any = []
        let _mostViewedVideo: any = []
        let _mostCommentedVideo: any = []
        let _mostRecentVideo: any = []
        let _mostRecentLiveStream: any = []
        let _mostRecentSeries: any = []
        let _mostRecentMontage: any = []
        let _mostRecentFunny: any = []
        let _mostRecentShorts: any = []
        let _mostRecentVlog: any = []

        mostLikedVideo = mostLikedVideo.rows.forEach((video: any) => {
            _mostLikedVideo.push(video.dataValues)
        })
        mostViewedVideo = mostViewedVideo.rows.forEach((video: any) => {
            _mostViewedVideo.push(video.dataValues)
        })
        mostCommentedVideo = mostCommentedVideo.rows.forEach((video: any) => {
            _mostCommentedVideo.push(video.dataValues)
        })
        mostRecentVideo = mostRecentVideo.rows.forEach((video: any) => {
            _mostRecentVideo.push(video.dataValues)
        })
        mostRecentLiveStream = mostRecentLiveStream.rows.forEach((video: any) => {
            _mostRecentLiveStream.push(video.dataValues)
        })
        mostRecentSeries = mostRecentSeries.rows.forEach((video: any) => {
            _mostRecentSeries.push(video.dataValues)
        })
        mostRecentMontage = mostRecentMontage.rows.forEach((video: any) => {
            _mostRecentMontage.push(video.dataValues)
        })
        mostRecentFunny = mostRecentFunny.rows.forEach((video: any) => {
            _mostRecentFunny.push(video.dataValues)
        })
        mostRecentShorts = mostRecentShorts.rows.forEach((video: any) => {
            _mostRecentShorts.push(video.dataValues)
        })
        mostRecentVlog = mostRecentVlog.rows.forEach((video: any) => {
            _mostRecentVlog.push(video.dataValues)
        })

        resolve({ _mostLikedVideo, _mostViewedVideo, _mostCommentedVideo, _mostRecentVideo, _mostRecentLiveStream, _mostRecentSeries, _mostRecentMontage, _mostRecentFunny, _mostRecentShorts, _mostRecentVlog })
    })
