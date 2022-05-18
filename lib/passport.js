import passport from "passport"
import { Strategy } from "passport-google-oauth2"
import "dotenv/config"

const config = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}

let verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    done(null, profile)

}

passport.use(new Strategy(config, verifyCallback))
