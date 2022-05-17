import { StreamerData } from "../models/StreamerData.model.js"


export const GetStreamerData = () => new Promise(async (resolve, reject) => {
    let streamerData = await StreamerData.findAll()
    let _streamerData_ = {}
    streamerData = streamerData.forEach(streamerData => {
        let _streamerData = streamerData.dataValues
        _streamerData_[_streamerData.name] = _streamerData.data
    }
    )
    resolve(_streamerData_)

})