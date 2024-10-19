import { sendError } from "h3"
import { createUser } from "../../db/users"
import { genTokens, sendRefreshToken } from "~/server/utils/jwt"
import { createRefreshToken } from "../../db/refreshTokens.js"

export default defineEventHandler(async (event) => {
    // reads input from frontend
    const body = await readBody(event)
    // sepcifically these input
    const { username, email, name, password, repeatPassword } = body
    
    // if one of these not present, throw error
    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid parameters." }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: "Passwords do not match." }))
    }

    // object of user's input
    const userData = {
        username, 
        email,
        password,
        name,
        profileImage: 'https://picsum.photos/200/200'
    }

    // passing said object to createUser
    const user = await createUser(userData)

    // generate access + refresh tokens
    const { accessToken, refreshToken } = genTokens(user)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    // returns body
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        body: user,
    }
})