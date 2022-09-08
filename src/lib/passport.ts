import passport from "passport"
import { Strategy } from "passport-google-oauth2"
import config from "../config"
import { User } from "../models"

const _config = {
    clientID: config.googleAuthClientID,
    clientSecret: config.googleAuthClientSecret,
    callbackURL: config.googleAuthCallbackURL,
}

function verifyCallback(accessToken: any, refreshToken: any, profile: any, done: any) {
    const user = { email: profile.email, name: profile.displayName, picture: profile.photos[0].value, id: profile.id }
    done(null, user)
}

passport.use(new Strategy(_config, verifyCallback))

passport.serializeUser(async (user: any, done) => {
    const now = Date.now()
    const findUser = await User.findOne({ userId: user.id })
    if (!findUser) {
        const newUser = new User()
        newUser.userId = user.id
        newUser.loginType = "google"
        newUser.name = user.name
        newUser.email = user.email
        newUser.profilePic = user.picture
        newUser.createdOn = now
        newUser.lastLogin = now
        newUser.status = true
        await newUser.save()
        done(null, user.id)
    }
    else {
        findUser.lastLogin = now
        findUser.save()
        done(null, user.id)
    }


})
passport.deserializeUser(async (id: number, done) => {
    done(null, id)
})
