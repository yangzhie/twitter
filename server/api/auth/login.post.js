import { sendError } from "h3"
import { getUserByUsername } from "~/server/db/users"
import { genTokens, sendRefreshToken } from "~/server/utils/jwt"
import { createRefreshToken } from "../../db/refreshTokens.js"
import bcrypt from "bcrypt"

export default defineEventHandler(async (event) => {
    // reads input from frontend
    const body = await readBody(event)

    const { username, password } = body
    
    if (!username || !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid parameters." }))
    }

    // is the user registered
    const user = await getUserByUsername(username)
    if (!user) {
        return sendError(event, createError({ statusCode: 400, statusMessage: "Username or password is invalid." }))
    }

    // compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // generate access + refresh tokens
    const { accessToken, refreshToken } = genTokens(user)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    return {
        accessToken,
        refreshToken,
        user
    }
})