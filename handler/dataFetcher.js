import { GetSettings, UpdateApiUtilization } from "../database/db_functions.js"
import { instagram_user_data, youtube_channel_live_stream_viewers_count, youtube_channel_statistics, youtube_channel_video_list } from "../functions/apiTemplates.js"
import { axios_simple_get } from "../functions/axios.js"
import { throwError } from "../functions/funtions.js"
import requestPromise from "request-promise"
import { load } from "cheerio"
import { youtube_watch_video, youtube_channel_video_thumbnail_maxresdefault, default_thumbnail } from "../functions/urlTemplates.js"
import { GetOrderBy } from "../database/poolify.js"
import { Get } from "../database/poolify.js"
import { AddNewVideos } from "../functions/updateVideosList.js"

//? YOUTUBE

let emptydata = {
    title: "nope",
    platform: "none",
    link: "dk",
    thumbnail: "dk",
    viewers_count: 0,
    status: "offline",
    last_update: Date.now(),
}

/**
 * 
 * @param {*} channelId 
 * @param {*} apiKey 
 * @returns 
 */
export const getYoutubeVidoesList = (channelId, apiKey) =>
    new Promise(async (reslove, reject) => {
        await UpdateApiUtilization(apiKey, 100)
        return axios_simple_get(youtube_channel_video_list(channelId, apiKey))
            .then((data) => reslove(data))
            .catch((err) => reject(err))
    })
/**
 * 
 * @param {*} channelId 
 * @param {*} apiKey 
 * @returns 
 */
export const getYoutubeChannelStatistics = (channelId, apiKey) => new Promise(async (resolve, reject) => {
    await UpdateApiUtilization(apiKey, 1)
    return axios_simple_get(youtube_channel_statistics(channelId, apiKey)).then((data) => resolve(data.items[0].statistics)).catch((err) => reject(throwError(err)))

})
/**
 * 
 * @param {*} video_id 
 * @param {*} apiKey 
 * @returns 
 */
export const getYoutubeCurrentViewers = (video_id, apiKey) => new Promise(async (resolve, reject) => {
    await UpdateApiUtilization(apiKey, 1)
    let url = youtube_channel_live_stream_viewers_count(video_id, apiKey)
    // data.items[0].liveStreamingDetails.concurrentViewers 
    axios_simple_get(url).then((data) => {
        resolve(data)
    }).catch((err) => reject(throwError(err)))
})

export const getSortedVideos = () => new Promise(async (reslove, reject) => {
    let mostViewed = await GetOrderBy("tbl_videos", "viewCount DESC LIMIT 1").then(data => data)
    let mostLiked = await GetOrderBy("tbl_videos", "likeCount DESC LIMIT 1").then(data => data)
    let mostCommented = await GetOrderBy("tbl_videos", "commentCount DESC LIMIT 1").then(data => data)
    let funny = await Get("tbl_videos", "type = 'funny'   ORDER BY viewCount DESC LIMIT 5").then(data => data)
    let montage = await Get("tbl_videos", "type = 'montage'   ORDER BY viewCount DESC LIMIT 1").then(data => data)
    let vlogs = await Get("tbl_videos", "type = 'vlog'  ORDER BY viewCount DESC LIMIT 5").then(data => data)
    let shorts = await Get("tbl_videos", "type = 'shorts'   ORDER BY viewCount DESC LIMIT 5").then(data => data)
    return reslove({ mostLiked, mostViewed, mostCommented, funny, montage, vlogs, shorts })
})



/**
 * 
 * @param {*} channelId 
 * @param {*} apiKey 
 * @returns 
 */
export const getYoutubeLiveData = (channelId, apiKey) => new Promise(async (resolve) => {
    let videos_list = await getYoutubeVidoesList(channelId, apiKey).catch((err) => console.log(err))
    //update vidoes list in database aswell 
    await AddNewVideos(videos_list.items)
    let isLive = videos_list.items.filter((videos) => (videos.snippet.liveBroadcastContent === "live" || videos.snippet.liveBroadcastContent === "upcoming") && videos.id.kind === "youtube#video")
    if (isLive.length > 0) {
        let viewers = await getYoutubeCurrentViewers(isLive[0].id.videoId, apiKey).then((data) => data.items[0].liveStreamingDetails.concurrentViewers).catch((err) => throwError(err))
        let data = {
            title: isLive[0].snippet.title,
            platform: "youtube",
            link: youtube_watch_video(isLive[0].id.videoId),
            thumbnail: youtube_channel_video_thumbnail_maxresdefault(isLive[0].id.videoId),
            viewers_count: viewers,
            status: "live",
            last_update: Date.now(),
        }
        return resolve(data)
    } else {
        return resolve(emptydata)
    }
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
export const getLocoData = (loco_channel_url) => new Promise(async (resolve, reject) => {
    requestPromise(loco_channel_url)
        .then(async (html) => {
            let $ = load(html)
            let common = "#__next > div > div > div > div.css-1n2rclm > div > div > div > div > div.css-1a1nk73 > div.css-v1ygcs > div.css-cfvz2v > "
            let loco_views_count = $(common + "div:nth-child(2) > span:nth-child(2)").text()
            let loco_followers_count = $(common + "div:nth-child(1) > span:nth-child(2)").text()
            let last_update = Date.now()
            return resolve({ loco_views_count, loco_followers_count, last_update })
        })
        .catch((err) => reject(throwError(err)))
})

/**
 * 
 * @param {*} loco_channel_url 
 * @returns 
 */
export const getLocoLiveData = (loco_channel_url) => new Promise(async (resolve) => {
    requestPromise(loco_channel_url)
        .then(async (html) => {
            let settings = await GetSettings().then(data => data[0])
            let $ = load(html)
            let data = $("div > div.css-8238fg").text()

            if (!data.includes("isn’t live ")) {
                let title = $(
                    "#__next > div > div > div > div.css-1n2rclm > div > div > div > div > div.css-1r168ll > div:nth-child(2) > div > div > div.css-d41wqj > div.css-e977ud > div.css-1wqq570.e1cv5vcz0"
                ).text()

                let viewers_count = $("div > div.css-pl8wq5").text()

                let data = {
                    title: (title.length < 10 ? settings.default_title : title),
                    platform: "loco",
                    link: loco_channel_url,
                    thumbnail: settings.default_thumbnail,
                    viewers_count: (viewers_count.split(" ")[0] || 0),
                    status: "live",
                    last_update: Date.now(),
                }
                return resolve(data)
            } else {
                return resolve(emptydata)
            }
        })
})


//? TWITTER

