import { PopUp } from "./models/PopUp.model.js"

let x = await PopUp.findAll()
console.log(x[0].dataValues)