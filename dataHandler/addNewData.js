import { Op } from "sequelize"
import { YoutubeAPI } from "../models/YoutubeAPI.model.js"
import { StreamerData } from "../models/StreamerData.model.js"
import { Videos } from "../models/Videos.model.js"
import { getVideoStatistics, getYoutubeVidoesList } from "../handler/dataFetcher.js"
import LoggerUtil from "../util/logger.js"
import moment from "moment"


export let addNewVideos = () =>
    new Promise(async (resolve, reject) => {
        let youtubeApiKey = await YoutubeAPI.findOne({ where: { utilization: { [Op.lt]: 9000 } } })
        let userData = await StreamerData.findOne({ where: { id: 1 } })
        let videosList = await getYoutubeVidoesList(userData.yt_channel_id, youtubeApiKey.key)

        await Promise.all(
            videosList.items.map(async (video) => {   //get video Stats
                if (video.snippet.liveBroadcastContent === "live" || video.snippet.liveBroadcastContent === "upcoming") return
                let videoStats = await getVideoStatistics(video.id.videoId, youtubeApiKey.key).then(res => res.items[0])
                let final_duration = moment.duration(videoStats.contentDetails.duration).asSeconds()
                let publishedAt = Math.floor(new Date(video.snippet.publishedAt).getTime() / 1000)

                let type =
                    final_duration <= 60
                        ? "shorts"
                        : final_duration <= 300
                            ? "montage"
                            : final_duration > 300 && final_duration <= 600
                                ? "funny"
                                : final_duration > 3600 && final_duration <= 1200
                                    ? "series"
                                    : "live_stream"

                type = (video.snippet.title.toLowerCase().includes("vlog") || video.snippet.title.toLowerCase().includes("vlogging")) ? "vlog" : type
                let checkVideoInDB = await Videos.findOne({ where: { videoId: video.id.videoId } })
                if (checkVideoInDB === null) {
                    LoggerUtil.info("Video " + video.snippet.title + " is not in DB - Adding")
                    return await Videos.create({
                        platform: "youtube",
                        videoId: video.id.videoId,
                        title: video.snippet.title,
                        type: type,
                        publishedAt: publishedAt,
                        duration: final_duration,
                        viewCount: videoStats.statistics.viewCount,
                        likeCount: videoStats.statistics.likeCount,
                        commentCount: videoStats.statistics.commentCount,

                    })
                }
            })
        )
        resolve({ status: true })
    })
