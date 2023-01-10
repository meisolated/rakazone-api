import _ from "lodash"
import requestPromise from "request-promise"
import { load } from "cheerio"
import logger from "../logger"
import { getYoutubeVidoesList, getYoutubeCurrentViewers } from "../helpers/liveDataFetcher"
import { youtube_watch_video, youtube_channel_video_thumbnail_maxresdefault } from "../helpers/urlTemplate"
import { instagram_user_data } from "../helpers/apiTemplate"
import { axios_simple_get } from "../helpers/axios"
import { YoutubeAPI } from "../models"
import { youtube_channel_statistics } from "../helpers/apiTemplate"

export const getYoutubeLiveData = (channelId: string, apiKey: string) =>
    new Promise(async (resolve) => {
        await getYoutubeVidoesList(channelId, apiKey)
            .then(async (videos_list: any) => {
                let isLive = videos_list.items.filter((videos: any) => (videos.snippet.liveBroadcastContent === "live" || videos.snippet.liveBroadcastContent === "upcoming") && videos.id.kind === "youtube#video")
                if (isLive.length > 0) {
                    let viewers = await getYoutubeCurrentViewers(isLive[0].id.videoId, apiKey)
                        .then((data: any) => data.items[0].liveStreamingDetails.concurrentViewers)
                        .catch((err) => console.log(err))
                    let publishedAt = Math.floor(new Date(isLive[0].snippet.publishedAt).getTime() / 1000)
                    let data = {
                        title: _.unescape(isLive[0].snippet.title),
                        platform: "youtube",
                        videoId: isLive[0].id.videoId,
                        link: youtube_watch_video(isLive[0].id.videoId),
                        publishedAt,
                        thumbnail: youtube_channel_video_thumbnail_maxresdefault(isLive[0].id.videoId),
                        viewers_count: viewers,
                        status: isLive[0].snippet.liveBroadcastContent,
                        last_update: Date.now(),
                    }
                    return resolve(data)
                } else {
                    return resolve({ status: "offline" })
                }
            })
            .catch((err) => {
                return resolve({ status: "offline" })
            })
    })

export const getLocoLiveData = (loco_channel_url: string) =>
    new Promise(async (resolve) => {
        // resolve({ status: "offline" })
        requestPromise(loco_channel_url)
            .then(async (html) => {
                let $ = load(html)
                let data = $("div > div.css-8238fg").text()
                logger.info(loco_channel_url)
                logger.info(data)
                if (!data.includes("isn’t live ")) {
                    let title = $("div.css-d41wqj > div.css-j1bv8q > h3").text()
                    let viewersCount = $("div > div.css-1172zl0 > span").text()
                    let thumbnail: any = $("div.css-qkvhrc > div > span > img").attr()
                    let data = {
                        title: title,
                        platform: "loco",
                        videoId: "RakaZone_Gaming",
                        publishedAt: Math.floor(Date.now() / 1000),
                        link: loco_channel_url,
                        thumbnail: thumbnail.src,
                        viewers_count: viewersCount.split(" ")[0] || 0,
                        status: "live",
                        last_update: Date.now(),
                    }
                    return resolve(data)
                } else {
                    return resolve({ status: "offline" })
                }
            })
            .catch((err) => resolve({ status: "offline" }))
    })

export const getInstagramData = (username: string) =>
    new Promise(async (resolve, reject) => {
        console.log(instagram_user_data(username))
        return axios_simple_get(instagram_user_data(username))
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })

export const getLocoData = (loco_channel_url: string) =>
    new Promise(async (resolve, reject) => {
        requestPromise(loco_channel_url)
            .then(async (html) => {
                let $ = load(html)

                let common = "#__next > div > div > div > div.css-1n2rclm > div > div > div > div > div > div.css-1a1nk73 > div.css-1d3w5wq > div.css-a4nydv > div.css-1vh3zz7 > "
                let loco_followers_count = $(common + "div.css-5dvmrn > span:nth-child(2)").text()
                let loco_views_count = $(common + "div.css-z1h266 > span:nth-child(2)").text()

                return resolve([{ loco_views_count }, { loco_followers_count }])
            })
            .catch((err) => reject(err))
    })

export const getYoutubeChannelStatistics = (channelId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findByIdAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } })
        return axios_simple_get(youtube_channel_statistics(channelId, apiKey))
            .then((data: any) => resolve(data.items[0].statistics))
            .catch((err) => reject(err))
    })
