import "dotenv/config"

interface conf {
    mongoUri: string,
    googleAuthClientID: string,
    googleAuthClientSecret: string,
    googleAuthCallbackURL: string,
    cookieSecret: string,
    cookieKey: string
}

const config: conf = {
    mongoUri:
        process.env.NODE_ENV == "production"
            ? "mongodb://10.69.69.201:27017/rakazone"
            : "mongodb://10.69.69.201:27017/rakazone",
    googleAuthClientID: "1086460618828-u7sto2ialgij63hjvbjkk16eo6v7dviv.apps.googleusercontent.com",
    googleAuthClientSecret: "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",
    googleAuthCallbackURL: "https://raka.zone/internal_api/v1/auth/google/callback",
    cookieSecret: "BuTCpZx6ndDUmfa9d4SRVHzQCqPvsMpR",
    cookieKey: "Z2DxkAzWtF9dpSwSz97aR3LpdQcbaVtS"
}
export default config
