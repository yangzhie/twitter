import { sendError } from "h3"
import { getUserByUsername } from "~/server/db/users"
import { genTokens } from "~/server/utils/jwt"
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
    const doesPasswordMatch = await bcrypt.compare(password, user.password)

    // generate access + refresh tokens
    const { accessToken } = genTokens(user)

    return {
        accessToken,
        user
    }
})