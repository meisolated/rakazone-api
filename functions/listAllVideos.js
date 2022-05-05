import axios from "axios"
import { AddVideo, UpdateApiUtilization, GetApiKeys } from "../database/db_functions.js"
import { youtube_channel_video_statistics } from "./apiTemplates.js"
import { sleep, throwError } from "./funtions.js"
import moment from "moment"

let api_key = await GetApiKeys().then((data) => data[0].api_key)
let first = 0
let videos_count = 0
async function get_videos(pageToken, api_key) {
    if (first === 1 && pageToken == undefined) return
    first = 1
    let q = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=UCRj_BU95SebaRi2FziXEoTg&part=snippet,id&order=date&maxResults=50`
    let request = pageToken ? q + `&pageToken=${pageToken}` : q
    console.log("Added " + videos_count + " videos")
    //get all videos
    axios
        .get(request)
        .then(async (data) => {
            let _data = data.data.items
            let videos = _data.filter((video) => video.id.kind === "youtube#video")
            await Promise.all(
                videos.map(async (video) => {
                    //now for each video get that video other detials
                    axios
                        .get(youtube_channel_video_statistics(video.id.videoId, api_key))
                        .then(async (other) => {
                            await UpdateApiUtilization(api_key, 1)
                            let final_data = other.data.items[0]
                            if (!final_data.contentDetails) {
                                console.log(other)
                                return process.exit()
                            }
                            let final_duration = moment.duration(final_data.contentDetails.duration).asSeconds()
                            let publishedAt = Math.floor(new Date(video.snippet.publishedAt).getTime() / 1000)

                            let type = final_duration <= 60 ? "shorts" : final_duration <= 300 ? "montage" : final_duration > 300 && final_duration <= 1200 ? "funny" : (final_duration > 1200 && final_duration < 3600) ? "series" : "live_stream"

                            type = video.snippet.title.toLowerCase().includes("vlog") || video.snippet.title.toLowerCase().includes("vlogging") ? "vlog" : type
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
                            await AddVideo(video_data).then(() => videos_count++)
                        })
                        .catch((err) => throwError(err + " channel Statistics Error " + JSON.stringify(video)))
                })
            )
            console.log("Added " + videos_count + " videos")
            await sleep(5000)
            await UpdateApiUtilization(api_key, 100)
            api_key = await GetApiKeys().then((keys) => keys[0].api_key)
            return get_videos(data.data.nextPageToken, api_key)
        })
        .catch((err) => throwError(err + " videos list error"))
}

await get_videos(undefined, api_key)
