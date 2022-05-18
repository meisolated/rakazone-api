import passport from "passport"
import { Strategy } from "passport-google-oauth2"
import "dotenv/config"

const config = {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
}

let verifyCallback = (accessToken, refreshToken, profile, done) => {
    let user = { email: profile.email, name: profile.displayName, picture: profile.photos[0].value, id: profile.id }
    done(null, user)
}

passport.use(new Strategy(config, verifyCallback))

passport.serializeUser((user, done) => {
    console.log(`serializeUser: ${user.id}`)
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    console.log(`Deserialize User: ${id}`)
    done(null, id)
}
)