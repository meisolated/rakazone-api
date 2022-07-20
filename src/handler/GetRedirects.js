import { Redirects } from "../models/Redirects.model.js"


export const GetRedirects = () => new Promise(async (resolve, reject) => {
    let redirects = await Redirects.findAll()
    let _redirects_ = {}
    redirects = redirects.forEach(redirect => {
        let _redirect = redirect.dataValues
        _redirects_[_redirect.from_where] = _redirect.to_where
    })
    resolve(_redirects_)
})