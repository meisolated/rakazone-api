import "dotenv/config"

interface conf {
    mongoUri: string,
    googleAuthClientID: string,
    googleAuthClientSecret: string,
    googleAuthCallbackURL: string,
    cookieSecret: string,
    cookieKey: string,
    sessionExpire: number
}

const config: conf = {
    mongoUri:
        process.env.NODE_ENV == "production"
            ? "mongodb://10.69.69.201:27017/rakazone"
            : "mongodb://10.69.69.201:27017/rakazone",
    googleAuthClientID: false ? "1086460618828-u7sto2ialgij63hjvbjkk16eo6v7dviv.apps.googleusercontent.com" : "1086460618828-vucadgj9jkj6c61dkcan5s1qcuibl5nr.apps.googleusercontent.com",
    googleAuthClientSecret: false ? "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" : "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",
    googleAuthCallbackURL: false ? "https://raka.zone/internal_api/v1/auth/google/callback" : "http://localhost:5001/api/auth/google/callback",
    cookieSecret: "BuTCpZx6ndDUmfa9d4SRVHzQCqPvsMpR",
    cookieKey: "Z2DxkAzWtF9dpSwSz97aR3LpdQcbaVtS",
    sessionExpire: 1000 * 60 * 60 * 24 * 30 // 1 Month
}
export default config
