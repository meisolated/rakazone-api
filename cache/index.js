import { Live } from "../models/Live.model.js"
import { StreamerData } from "../models/StreamerData.model.js"
import { Redirects } from "../models/Redirects.model.js"
import { GetSortedVideos } from "../handler/GetSortedVideos.js"
import NodeCache from 'node-cache'
import LoggerUtil from "../util/logger.js"
const Cache = new NodeCache({ stdTTL: 100, checkperiod: 120 })

LoggerUtil.info("Initializing Cache")

//initilize cache 
let _dataStreamerData = {}
let _dataredirects = {}
let sortedVideos = await GetSortedVideos()
let liveData = await Live.findOne({ where: { id: 1 } })
let streamerData = await StreamerData.findAll()
let redirects = await Redirects.findAll()
streamerData.forEach(element => {
    _dataStreamerData[element.name] = element.data
})
redirects.forEach(element => {
    _dataredirects[element.from_where] = element.to_where
})



Cache.set("liveData", liveData)
Cache.set("streamerData", _dataStreamerData)
Cache.set("redirects", _dataredirects)
Cache.set("sortedVideos", sortedVideos)



export { Cache }