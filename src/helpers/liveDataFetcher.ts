import { YoutubeAPI } from "../models"
import axios from "axios"
import { youtube_channel_video_list, youtube_channel_live_stream_viewers_count } from "./apiTemplate"

const axios_simple_get = (url: string) =>
    new Promise((reslove, reject) => {
        axios
            .get(url)
            .then(async ({ data }) => {
                return reslove(data)
            })
            .catch((err) => reject(err))
    })
export const getYoutubeVidoesList = (channelId: string, apiKey: string) =>
    new Promise(async (reslove, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 100 } })
        return axios_simple_get(youtube_channel_video_list(channelId, apiKey))
            .then((data) => reslove(data))
            .catch((err) => reject(err))
    })

export const getYoutubeCurrentViewers = (video_id: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findByIdAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } })
        let url = youtube_channel_live_stream_viewers_count(video_id, apiKey)
        // data.items[0].liveStreamingDetails.concurrentViewers
        axios_simple_get(url)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => reject(err))
    })
