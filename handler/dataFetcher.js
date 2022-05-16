import { instagram_user_data, youtube_channel_live_stream_viewers_count, youtube_channel_statistics, youtube_channel_video_list, youtube_channel_video_statistics } from "../functions/apiTemplates.js"
import { axios_simple_get } from "../functions/axios.js"
import { throwError } from "../functions/funtions.js"
import requestPromise from "request-promise"
import { load } from "cheerio"
import { youtube_watch_video, youtube_channel_video_thumbnail_maxresdefault, default_thumbnail } from "../functions/urlTemplates.js"
import { YoutubeAPI } from "../models/YoutubeAPI.model.js"

//? YOUTUBE
/**
 *
 * @param {*} channelId
 * @param {*} apiKey
 * @returns
 */
export const getYoutubeVidoesList = (channelId, apiKey) =>
    new Promise(async (reslove, reject) => {
        await YoutubeAPI.increment({ utilization: 100 }, { where: { key: apiKey } })
        return axios_simple_get(youtube_channel_video_list(channelId, apiKey))
            .then((data) => reslove(data))
            .catch((err) => reject(err))
    })

export const getVideoStatistics = (videoId, apiKey) =>
    new Promise(async (reslove, reject) => {
        await YoutubeAPI.increment({ utilization: 1 }, { where: { key: apiKey } })
        axios_simple_get(youtube_channel_video_statistics(videoId, apiKey))
            .then(async (other) => {
                reslove(other)
            })
            .catch((err) => reject(err))
    })

/**
 *
 * @param {*} channelId
 * @param {*} apiKey
 * @returns
 */
export const getYoutubeChannelStatistics = (channelId, apiKey) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.increment({ utilization: 1 }, { where: { key: apiKey } })
        return axios_simple_get(youtube_channel_statistics(channelId, apiKey))
            .then((data) => resolve(data.items[0].statistics))
            .catch((err) => reject(throwError(err)))
    })
/**
 *
 * @param {*} video_id
 * @param {*} apiKey
 * @returns
 */
export const getYoutubeCurrentViewers = (video_id, apiKey) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.increment({ utilization: 1 }, { where: { key: apiKey } })
        let url = youtube_channel_live_stream_viewers_count(video_id, apiKey)
        // data.items[0].liveStreamingDetails.concurrentViewers
        axios_simple_get(url)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => reject(throwError(err)))
    })

/**
 *
 * @param {*} channelId
 * @param {*} apiKey
 * @returns
 */
export const getYoutubeLiveData = (channelId, apiKey) =>
    new Promise(async (resolve) => {
        await getYoutubeVidoesList(channelId, apiKey)
            .then(async (videos_list) => {
                let isLive = videos_list.items.filter((videos) => (videos.snippet.liveBroadcastContent === "live" || videos.snippet.liveBroadcastContent === "upcoming") && videos.id.kind === "youtube#video")

                if (isLive.length > 0) {
                    let viewers = await getYoutubeCurrentViewers(isLive[0].id.videoId, apiKey)
                        .then((data) => data.items[0].liveStreamingDetails.concurrentViewers)
                        .catch((err) => throwError(err))
                    let publishedAt = Math.floor(new Date(isLive[0].snippet.publishedAt).getTime() / 1000)
                    let data = {
                        title: isLive[0].snippet.title,
                        platform: "youtube",
                        videoId: isLive[0].id.videoId,
                        link: youtube_watch_video(isLive[0].id.videoId),
                        publishedAt,
                        thumbnail: youtube_channel_video_thumbnail_maxresdefault(isLive[0].id.videoId),
                        viewers_count: viewers,
                        status: "live",
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

//? INSTAGRAM
/**
 *
 * @param {*} username
 * @returns
 */
export const getInstagramData = (username) =>
    new Promise(async (resolve, reject) => {
        console.log(instagram_user_data(username))
        return axios_simple_get(instagram_user_data(username))
            .then((data) => resolve(data))
            .catch((err) => reject(throwError(err)))
    })

//? LOCO
/**
 *
 * @returns
 */
export const getLocoData = (loco_channel_url) =>
    new Promise(async (resolve, reject) => {
        requestPromise(loco_channel_url)
            .then(async (html) => {
                let $ = load(html)

                let common = "#__next > div > div > div > div.css-1n2rclm > div > div > div > div > div > div.css-1a1nk73 > div.css-1d3w5wq > div.css-a4nydv > div.css-1vh3zz7 > "
                let loco_followers_count = $(common + "div.css-5dvmrn > span:nth-child(2)").text()
                let loco_views_count = $(common + "div.css-z1h266 > span:nth-child(2)").text()

                return resolve([{ loco_views_count }, { loco_followers_count }])
            })
            .catch((err) => reject(throwError(err)))
    })

/**
 *
 * @param {*} loco_channel_url
 * @returns
 */
export const getLocoLiveData = (loco_channel_url) =>
    new Promise(async (resolve) => {
        requestPromise(loco_channel_url)
            .then(async (html) => {
                let $ = load(html)
                let data = $("div > div.css-8238fg").text()

                if (!data.includes("isn’t live ")) {
                    let title = $("div.css-d41wqj > div.css-e977ud > div.css-18582wk.e1cv5vcz0").text()

                    let viewers_count = $("div > div.css-pl8wq5").text()

                    let data = {
                        title: title,
                        platform: "loco",
                        videoId: "RakaZone_Gaming",
                        publishedAt: Date.now(),
                        link: loco_channel_url,
                        thumbnail: default_thumbnail(),
                        viewers_count: viewers_count.split(" ")[0] || 0,
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

//? TWITTER
