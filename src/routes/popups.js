import { sleep } from "../functions/funtions.js"
import { formatResponseError, formatResponseSuccess } from "../helper/index.js"
import { PopUp } from "../models/PopUp.model.js"

export default function (app, path) {
 app.get(path, async (req, res) => {
  try {
   // { where: { status: "active", id: 1 } }
   let popups = await PopUp.findAll({ where: { status: true } })
   return formatResponseSuccess(res, { popups: popups })
  } catch (err) {
   formatResponseError(res, err)
  }
 })
}
