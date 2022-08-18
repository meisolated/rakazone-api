import checkLogged from "../helper/checkLogged.js"
import { formatResponseSuccess, formatResponseError } from "../helper/index.js"
import { Users } from "../models/Users.model.js"

export default function (app, path) {
 app.get(path, checkLogged, async (req, res) => {
  try {
   let user = await Users.findOne({ where: { user_id: req.user } }).then((user) => user.dataValues)
   formatResponseSuccess(res, { user })
  } catch (err) {
   formatResponseError(res, err)
  }
 })
}
