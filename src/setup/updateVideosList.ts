import axios from "axios"
import { youtube_channel_video_statistics } from "../helpers/apiTemplate"
import { Videos } from "../models/"
import moment from "moment"
import { sleep, UrlExists } from "../functions/functions"
import { youtube_channel_video_thumbnail_maxresdefault } from "../helpers/urlTemplate"
import { convertToInternationalCurrencySystem } from "../functions/functions"

export const UpdateVideosList = (video: any, api_key: string) =>
    new Promise((resolve, reject) => {
        //get other video stats

        axios.get(youtube_channel_video_statistics(video.id.videoId, api_key)).then(async (other) => {
            let final_data = other.data.items[0]
            let final_duration = moment.duration(final_data.contentDetails.duration).asSeconds()
            let type = final_duration <= 120 ? "shorts" : final_duration <= 300 ? "montage" : final_duration > 300 && final_duration <= 600 ? "funny" : final_duration > 3600 && final_duration <= 1200 ? "series" : "live_stream"
            let thumbnail = (await UrlExists(youtube_channel_video_thumbnail_maxresdefault(video.id.videoId))) ? youtube_channel_video_thumbnail_maxresdefault(video.id.videoId) : `https://raka.zone/assets/img/thumbnail_not_found.png`
            interface video_data_interface {
                videoId: string
                title: string
                type: string
                thumbnail: string
                publishedAt: string
                duration: string
                viewCount: any
                likeCount: string
                commentCount: string
            }
            let video_data: video_data_interface = {
                videoId: "",
                title: "",
                type: "",
                thumbnail: "",
                publishedAt: "",
                duration: "",
                viewCount: "",
                likeCount: "",
                commentCount: "",
            }

            video_data.videoId = video.id.videoId
            video_data["title"] = video.snippet.title
            video_data["type"] = type
            video_data["thumbnail"] = thumbnail
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

export const UpdateVideoData = () =>
    new Promise<void>(async (resolve, reject) => {
        let allVideosList = await Videos.find()
        let x = 0
        allVideosList.forEach(async (video) => {
            x++
            let final_duration = video.duration
            let title = video.title.toLowerCase()
            let title_array = title.split(" ")
            let type = final_duration <= 120 ? "shorts" : final_duration <= 300 ? "montage" : final_duration > 300 && final_duration <= 600 ? "funny" : final_duration > 3600 && final_duration <= 1200 ? "series" : "live_stream"
            type =
                title.includes("vlog") || title.includes("vlogging")
                    ? "vlog"
                    : title.includes("montage")
                    ? "montage"
                    : title.includes("funny")
                    ? "funny"
                    : title.includes("episode")
                    ? "series"
                    : title.includes("shorts")
                    ? "shorts"
                    : title_array.includes("irl")
                    ? "irl"
                    : type
            console.log("Updated " + x + " videos")
            let thumbnail = (await UrlExists(youtube_channel_video_thumbnail_maxresdefault(video.videoId))) ? youtube_channel_video_thumbnail_maxresdefault(video.videoId) : `https://raka.zone/assets/img/thumbnail_not_found.png`
            await sleep(100)
            await Videos.update({ type: type, thumbnail }, { where: { videoId: video.videoId } })
        })
        resolve()
    })
function AddVideo(video_data: any) {
    throw new Error("Function not implemented.")
}
