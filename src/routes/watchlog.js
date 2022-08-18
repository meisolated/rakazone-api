import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { WatchLog } from "../models/WatchLog.model.js"

export default function (app, path) {
 app.post(path, async (req, res) => {
  const { userId, playing, muted, volume, ts, ct, vl, vi, platform, browser } = req.body
  if (!userId || !playing || !muted || !volume || !ts || !ct || !vl || !vi || !platform || !browser) return formatResponseError(res, { message: "Missing fields", status: 400 })
  try {
   const watchLog = await WatchLog.create({ user_id: userId, playing, muted, volume, ts, ct, vl, vi, platform, browser })
   return formatResponseSuccess(res, { watchLog })
  } catch (err) {
   console.log(err)
   formatResponseError(res, err)
  }
 })
}
