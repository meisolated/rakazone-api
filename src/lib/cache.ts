import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 60 * 60 * 24, checkperiod: 60 * 60 })

interface data {
   key: string
   value: any
}
const get = (i: string) => cache.get(i)
const set = (data: data) => cache.set(data.key, data.value)

export { get, set }
