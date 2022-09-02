import "dotenv/config"

interface conf {
    mongoUri?: string,
    googleAuthClientID?: string,
    googleAuthClientSecret?: string,
    googleAuthCallbackURL?: string,
}

const config: conf = {
    mongoUri:
        process.env.NODE_ENV == "dev"
            ? process.env.MONGO_DEV_URI
            : process.env.MONGO_PRO_URI,
    googleAuthClientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    googleAuthClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    googleAuthCallbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
}
export default config
