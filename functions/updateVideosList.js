import axios from "axios"
import { youtube_channel_video_statistics, youtube_channel_video_list } from "./apiTemplates.js"
import { GetVideos, GetApiKeys } from "../database/db_functions.js"
import moment from "moment"
import { AddVideo } from "../database/db_functions.js"
import LoggerUtil from "../util/logger.js"
/**
 * 
 * @param {*} video Video ID
 * @param {*} api_key youtube API key
 * @returns nothing
 */
export const UpdateVideosList = (video) =>
    new Promise(async (resolve, reject) => {
        let apikey = await GetApiKeys().then((data) => data[0].api_key)
        //get other video stats
        axios.get(youtube_channel_video_statistics(video.id.videoId, apikey)).then(async (other) => {
            let final_data = other.data.items[0]
            let final_duration = moment.duration(final_data.contentDetails.duration).asSeconds()
            let publishedAt = Math.floor(new Date(video.snippet.publishedAt).getTime() / 1000)
            let type = final_duration <= 60 ? "shorts" : final_duration <= 300 ? "montage" : (final_duration > 300 && final_duration <= 1200) ? "funny" : (final_duration > 3600 && final_duration <= 1200) ? "series" : "live_stream"
            let video_data = {}
            video_data["videoId"] = video.id.videoId
            video_data["title"] = video.snippet.title
            video_data["type"] = type
            video_data["publishedAt"] = publishedAt
            video_data["duration"] = final_duration
            video_data["viewCount"] = final_data.statistics.viewCount
            video_data["likeCount"] = final_data.statistics.likeCount
            video_data["commentCount"] = final_data.statistics.commentCount
            // all_videos_list.videos.push(video_data)
            try {
                LoggerUtil.info("Added video " + video.snippet.title)
                return resolve(await AddVideo(video_data))
            } catch (error) {
                return reject(error)
            }
        })
    })


export const AddNewVideos = (vidoes) => new Promise(async (resolve, reject) => {
    let videos_list = await GetVideos()
    let videos_list_ids = videos_list.map((video) => video.videoId)
    let videos_filtered = vidoes.filter((video) => video.id.kind === "youtube#video" && !video.snippet.liveBroadcastContent !== "live")
    let videos_to_add = videos_filtered.filter((video) => !videos_list_ids.includes(video.id.videoId))
    //add video
    videos_to_add.map((video) => {
        LoggerUtil.info("Adding video " + video.snippet.title)
        resolve(UpdateVideosList(video))
    })
    if (videos_to_add.length === 0) {
        resolve()
    }

})


