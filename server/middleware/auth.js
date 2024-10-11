import UrlPattern from "url-pattern"
import { decodeAccessToken } from "~/server/utils/jwt"
import { sendError } from "h3"
import { getUserById } from "../db/users"

export default defineEventHandler(async (event) => {
    // What endpoints can use auth
    const endpoints = [
        '/api/auth/user',
        '/api/user/tweets',
        '/api/tweets'
    ]

    const isHandledByThisMiddleware = endpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint)
        return pattern.match(event.node.req.url)
    })

    if (!isHandledByThisMiddleware) {
        return
    }

    const token = event.node.req.headers['authorization']?.split(" ")[1]

    if (!token) {
        console.log("Token missing in Authorization header");
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Token missing"
        }));
    }

    const decoded = decodeAccessToken(token)

    if (!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        }))
    }

    console.log("Decoded token:", decoded);
    
    try {
        const userId = decoded.userId
        const user = await getUserById(userId)

        if (!user) {
            console.log("User not found");
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: "User not found"
            }));
        }

        event.context.auth = { user }
    } catch (error) {
        console.error("Error fetching user:", error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: "Internal Server Error"
        }));
    }
})