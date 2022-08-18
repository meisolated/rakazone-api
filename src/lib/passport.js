import "dotenv/config"
import passport from "passport"
import { Strategy } from "passport-google-oauth2"
import { Users } from "../models/Users.model.js"

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

passport.serializeUser(async (user, done) => {
 let _user = await Users.findOne({ where: { user_id: user.id } })
 if (_user == null) {
  await Users.create({ user_id: user.id, name: user.name, email: user.email, profile_pic: user.picture, login_type: "google", created_on: Date.now(), last_login: Date.now() })
 } else {
  _user.last_login = Date.now()
  await _user.save()
 }
 done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
 done(null, id)
})
