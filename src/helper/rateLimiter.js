import rateLimit from "express-rate-limit"
export const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    message: "You have exceeded the 100 requests in 1 min limit!",
    headers: true,
})
