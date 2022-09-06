import passport from "passport"
import { Strategy } from "passport-google-oauth2"
import config from "../config"


const _config = {
    clientID: config.googleAuthClientID,
    clientSecret: config.googleAuthClientSecret,
    callbackURL: config.googleAuthCallbackURL,
}

function verifyCallback(accessToken: any, refreshToken: any, profile: any, done: any) {
    const user = { email: profile.email, name: profile.displayName, picture: profile.photos[0].value, id: profile.id }
    done(null, user)
}
//@ts-ignore
passport.use(new Strategy(_config, verifyCallback))

passport.serializeUser(async (user, done) => {
    console.log(user)
    // let _user = await Users.findOne({ where: { user_id: user.id } })
    // if (_user == null) {
    // await Users.create({ user_id: user.id, name: user.name, email: user.email, profile_pic: user.picture, login_type: "google", created_on: Date.now(), last_login: Date.now() })
    // } else {
    // _user.last_login = Date.now()
    // await _user.save()
    // }
    // @ts-ignore
    done(null, user.id)
})
passport.deserializeUser(async (id: number, done) => {
    done(null, id)
})
