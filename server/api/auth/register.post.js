import { sendError } from "h3"
import {createUser} from "../../db/users"

export default defineEventHandler(async (event) => {
    // reads input from frontend
    const body = await readBody(event)
    // sepcifically these input
    const { username, email, password, repeatPassword, name } = body
    
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

    // returns body
    return {
        body: user
    }
})