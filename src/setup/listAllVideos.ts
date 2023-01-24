import axios from "axios"
import { Videos, YoutubeAPI } from "../models"
import { youtube_channel_video_statistics } from "../helpers/apiTemplate"
import { sleep, throwError } from "../functions/functions"
import moment from "moment"

let first = 0
let videos_count = 0
async function get_videos(pageToken: string) {
    let youtubeApiKey = await YoutubeAPI.findOne({ utilization: { $lt: 9900 } })
    if (first === 1 && pageToken == undefined) return
    first = 1
    let q = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey!.key}&channelId=UCRj_BU95SebaRi2FziXEoTg&part=snippet,id&order=date&maxResults=50`
    let request = pageToken ? q + `&pageToken=${pageToken}` : q

    //get all videos
    axios
        .get(request)
        .then(async (data) => {
            let _data = data.data.items
            let videos = _data.filter((video: any) => video.id.kind === "youtube#video")
            await Promise.all(
                videos.map(async (video: any) => {
                    axios
                        .get(youtube_channel_video_statistics(video.id.videoId, youtubeApiKey!.key))
                        .then(async (other) => {
                            //increment to youtubeAPI
                            await YoutubeAPI.findOneAndUpdate({ key: youtubeApiKey!.key }, { $inc: { utilization: 1 } })
                            let final_data = other.data.items[0]
                            if (!final_data.contentDetails) {
                                console.log(other)
                                return process.exit()
                            }
                            let final_duration = moment.duration(final_data.contentDetails.duration).asSeconds()
                            let publishedAt = Math.floor(new Date(video.snippet.publishedAt).getTime() / 1000)
                            let type = final_duration <= 120 ? "shorts" : final_duration <= 300 ? "montage" : final_duration > 300 && final_duration <= 600 ? "funny" : final_duration > 3600 && final_duration <= 1200 ? "series" : "live_stream"

                            type = video.snippet.title.toLowerCase().includes("vlog") || video.snippet.title.toLowerCase().includes("vlogging") ? "vlog" : type
                            await Videos.create({
                                videoId: video.id.videoId,
                                title: video.snippet.title,
                                type: type,
                                publishedAt: publishedAt,
                                duration: final_duration,
                                viewCount: final_data.statistics.viewCount,
                                likeCount: final_data.statistics.likeCount,
                                commentCount: final_data.statistics.commentCount,
                            }).then(() => videos_count++)
                        })
                        .catch((err) => throwError(err + " channel Statistics Error " + JSON.stringify(video)))
                })
            )
            console.log("Added : " + videos_count + "videos")
            await sleep(5000)
            await YoutubeAPI.findOneAndUpdate({ key: youtubeApiKey!.key }, { $inc: { utilization: 100 } })
            return get_videos(data.data.nextPageToken)
        })
        .catch((err) => throwError(err + " videos list error"))
}
