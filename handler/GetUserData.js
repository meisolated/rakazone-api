import { GetApiKeys, GetUserData } from "../database/db_functions.js"
import { loco_channel } from "../functions/urlTemplates.js"
import { getYoutubeChannelStatistics, getLocoData, getInstagramData } from "./dataFetcher.js"
import { convertToInternationalCurrencySystem } from "../functions/funtions.js"
import _ from "lodash"

/**
 *
 * @returns JSON obj {yt_views_count, yt_subscribers_count, yt_videos_count}
 */
export const GetYoutubeUserData = () =>
    new Promise(async (resolve, _reject) => {
        let channelId = await GetUserData().then((user_data) => user_data[0].yt_channel_id)
        let api_key = await GetApiKeys().then((data) => data[0].api_key)
        let channel_statistics = await getYoutubeChannelStatistics(channelId, api_key)
        return resolve({
            yt_views_count: convertToInternationalCurrencySystem(channel_statistics.viewCount),
            yt_subscribers_count: convertToInternationalCurrencySystem(channel_statistics.subscriberCount),
            yt_videos_count: channel_statistics.videoCount,
        })
    })

/**
 *
 * @returns loco_views_count, loco_followers_count
 */
export const GetLocoUserData = () =>
    new Promise(async (resolve) => {
        let loco_username = await GetUserData().then((data) => data[0].loco_username)
        let loco_channel_url = loco_channel(loco_username)
        let locoData = await getLocoData(loco_channel_url)
        return resolve(locoData)
    })

/**
 *
 * @param {*} info
 * @returns nothing not working rightnow
 * @todo
 */
export const GetTwitterUserData = () =>
    new Promise((resolve) => {
        return resolve("skip")
    })

/**
 *
 * @param {*} info
 * @returns nothing not working rightnow
 * @todo
 */
export const GetInstagramUserData = () =>
    new Promise(async (resolve) => {
        getInstagramData().then((data) => {
            console.log(data)
            return resolve({ insta_followers_count: data.graphql.user.edge_followed_by.count }) // data.graphql.user.edge_followed_by.count
        })
    })
