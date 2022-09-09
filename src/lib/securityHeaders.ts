import { NextFunction, Request, Response } from "express"
/**
 * @deprecated
 */
export default function securityHeaders(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
    // Cross-Origin-Embedder-Policy: require-corp
    // Cross-Origin-Opener-Policy: same-origin
    // Cross-Origin-Resource-Policy: same-origin
    // Origin-Agent-Cluster: ?1
    // Referrer-Policy: no-referrer
    // Strict-Transport-Security: max-age=15552000; includeSubDomains
    // X-Content-Type-Options: nosniff
    // X-DNS-Prefetch-Control: off
    // X-Download-Options: noopen
    // X-Frame-Options: SAMEORIGIN
    // X-Permitted-Cross-Domain-Policies: none
    // X-XSS-Protection: 0
    res.append(
        "Content-Security-Policy:",
        "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
    )
    res.append("Cross-Origin-Embedder-Policy:", "require-corp")
    res.append("Cross-Origin-Resource-Policy", "same-origin")
    res.append("Cross-Origin-Opener-Policy:", "same-origin")
    res.append("Origin-Agent-Cluster:", "?1")
    res.append("Referrer-Policy:", "no-referrer")
    res.append(
        "Strict-Transport-Security:",
        "max-age=15552000; includeSubDomains"
    )
    res.append("X-Content-Type-Options:", "nosniff")
    res.append("X-DNS-Prefetch-Control:", "off")
    res.append("X-Download-Options:", "noopen")
    res.append("X-Frame-Options:", "SAMEORIGIN")
    res.append("X-Permitted-Cross-Domain-Policies:", "none")
    res.append("X-XSS-Protection:", "0")
    next()
}
