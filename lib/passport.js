import passport from "passport"
import { Strategy } from "passport-google-oauth2"
import "dotenv/config"

const config = {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
}

let verifyCallback = (accessToken, refreshToken, profile, done) => {
    done(null, profile)
}

passport.use(new Strategy(config, verifyCallback))
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
}
)