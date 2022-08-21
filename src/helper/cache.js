import NodeCache from "node-cache"
const myCache = new NodeCache({ stdTTL: 40000, checkperiod: 1200 })

export default myCache
