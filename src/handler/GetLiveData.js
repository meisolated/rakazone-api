import { Live } from '../models/Live.model.js'


export const GetLiveData = () => new Promise(async (resolve, reject) => {
    let live = await Live.findOne({ where: { id: 1 } })
    resolve(live.dataValues)
})