import axios from "axios"
import { youtube_channel_video_statistics } from "./apiTemplates.js"
import { GetVideos } from "../database/db_functions.js"
import moment from "moment"
export const UpdateVideosList = (video, api_key) =>
    new Promise((resolve, reject) => {
        //get other video stats

        axios.get(youtube_channel_video_statistics(video.id.videoId, api_key)).then(async (other) => {
            let final_data = other.data.items[0]
            let final_duration = moment.duration(final_data.contentDetails.duration).asSeconds()
            let type = final_duration <= 60 ? "shorts" : final_duration <= 300 ? "montage" : (final_duration > 300 && final_duration <= 1200) ? "funny" : (final_duration > 3600 && final_duration <= 1200) ? "series" : "live_stream"
            let video_data = {}
            video_data["videoId"] = video.id.videoId
            video_data["title"] = video.snippet.title
            video_data["type"] = type
            video_data["publishedAt"] = video.snippet.publishedAt
            video_data["duration"] = final_data.contentDetails.duration
            video_data["viewCount"] = convertToInternationalCurrencySystem(final_data.statistics.viewCount)
            video_data["likeCount"] = final_data.statistics.likeCount
            video_data["commentCount"] = final_data.statistics.commentCount
            // all_videos_list.videos.push(video_data)
            try {
                return await AddVideo(video_data)
            } catch (error) {
                return
            }
        })
    })


// export const UpdateVideoType = () => new Promise(async (resolve, reject) => {
//     let allVideosList = await GetVideos()

//     allVideosList.forEach(async video => {
//         let final_duration = moment.duration(video.duration).asSeconds()
//         let type = final_duration <= 60 ? "shorts" : final_duration <= 300 ? "montage" : (final_duration > 300 && final_duration <= 600) ? "funny" : (final_duration > 3600 && final_duration <= 1200) ? "series" : "live_stream"
//         console.log(type)


//     })
//     resolve()
// })