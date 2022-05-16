import { Op } from "sequelize"
import { Live } from "../models/Live.model.js"
import { YoutubeAPI } from "../models/YoutubeAPI.model.js"
import { Settings } from "../models/Settings.model.js"
import { StreamerData } from "../models/StreamerData.model.js"
import { Videos } from "../models/Videos.model.js"

import { getVideoStatistics, getYoutubeCurrentViewers } from "../handler/dataFetcher.js"
import { CheckYoutube, CheckLoco } from "../handler/GetLiveStatus.js"
import LoggerUtil from "../util/logger.js"
import { isEmptyObject, sleep } from "../functions/funtions.js"
import { GetLocoUserData, GetYoutubeUserData } from "../handler/GetUserData.js"



//empty data 


//update live data
export let updateLiveData = () =>
    new Promise(async (resolve, reject) => {
        let _data = {}
        let currentTime = Date.now()
        let currentliveData = await Live.findOne({ where: { id: 1 } })
        let youtubeApiKey = await YoutubeAPI.findOne({ where: { utilization: { [Op.lt]: 9000 } } })
        let settings = await Settings.findOne({ where: { id: 1 } })
        let streamerData = await StreamerData.findAll()
        streamerData.forEach(element => {
            _data[element.name] = element.data
        })

        if (currentliveData.last_update + settings.check_in_if_live < currentTime && currentliveData.status === "live") {
            LoggerUtil.info("Live data needs to be updated")
            //if live update live viewers count and status
            if (currentliveData.platform === "youtube") {
                let currentViewers = await getYoutubeCurrentViewers(currentliveData.videoId, youtubeApiKey.key)
                let updateLiveStatus = isEmptyObject(currentViewers.items[0].liveStreamingDetails)
                    ? { status: "offline" }
                    : { viewers_count: currentViewers.items[0].liveStreamingDetails.concurrentViewers, last_update: currentTime }
                await Live.update(updateLiveStatus, { where: { id: 1 } })
                return resolve({ success: true })
            } else if (currentliveData.platform === "loco") {
                let currentViewers = await CheckLoco(_data.loco_username)
                let updateLiveStatus = currentViewers.status === "offline" ? { status: "offline" } : { viewers_count: currentViewers.viewers_count }
                await Live.update(updateLiveStatus, { where: { id: 1 } })
                return resolve({ success: true })
            }
        } else if (currentliveData.last_update + settings.check_in < currentTime && currentliveData.status === "offline") {
            LoggerUtil.info("Currenly Offline - Checking if live")
            let youtubeLiveStatus = await CheckYoutube(youtubeApiKey.key, _data.yt_channel_id)
            let locoLiveStatus = await CheckLoco(_data.loco_username)
            let updateLiveStatus = youtubeLiveStatus.status === "live" ? youtubeLiveStatus : locoLiveStatus.status === "live" ? locoLiveStatus : { last_update: currentTime }
            await Live.update(updateLiveStatus, { where: { id: 1 } })
            return resolve({ success: true })
        } else {
            LoggerUtil.info("Live data is up to date")
            return resolve({ success: true })
        }
    })

//update user data
export let updateUserData = () =>
    new Promise(async (resolve, reject) => {
        //update user data here
        let _data = {}
        let currentTime = Date.now()
        let streamerData = await StreamerData.findAll()
        let youtubeApiKey = await YoutubeAPI.findOne({ where: { utilization: { [Op.lt]: 9000 } } })
        streamerData.forEach(element => {
            _data[element.name] = element.data
        })
        //update user data here
        let getLocoUserData = await GetLocoUserData(_data.loco_username)
        let getYoutubUserData = await GetYoutubeUserData(_data.yt_channel_id, youtubeApiKey.key)
        // let finalData = Object.assign(getLocoUserData, getYoutubUserData)
        let finalData = getLocoUserData.concat(getYoutubUserData)

        finalData.forEach(async (data) => {
            let where = Object.keys(data)[0]
            let values = Object.values(data)[0]
            await StreamerData.update({ data: values, last_update: currentTime }, { where: { name: where } })

        })
        await sleep(3000)
        return resolve({ success: true })

    })

export let updateVideoStats = () =>
    new Promise(async (resolve, reject) => {
        let videosList = await Videos.findAll()
        //map through videos and update stats\
        await Promise.all(
            videosList.map(async (video) => {
                let youtubeApiKey = await YoutubeAPI.findOne({ where: { utilization: { [Op.lt]: 9000 } } })
                let videoStats = await getVideoStatistics(video.videoId, youtubeApiKey.key)
                videoStats = videoStats.items[0]

                if (!isEmptyObject(videoStats.contentDetails) && !isEmptyObject(videoStats.statistics)) {
                    if (video.viewCount != videoStats.statistics.viewCount || video.likeCount != videoStats.statistics.likeCount) {
                        LoggerUtil.info("Video stats needs to be updated")
                        return await Videos.update(
                            {
                                viewCount: videoStats.statistics.viewCount,
                                likeCount: videoStats.statistics.likeCount,
                                commentCount: videoStats.statistics.commentCount,
                            },
                            { where: { videoId: video.videoId } }
                        )
                    }
                }
            })
        )
        resolve()
    })
