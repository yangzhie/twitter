import { sendError } from "h3"

export default defineEventHandler(async (event) => {
    // reads input from frontend
    const body = await readBody(event)
    // sepcifically these input
    const { username, email, password, repeatPassword, name } = body
    
    // if one of these not present, throw error
    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError({statusCode: 400, statusMessage: "Invalid params"}))
    }

    

    // returns body
    return {
        body
    }
})