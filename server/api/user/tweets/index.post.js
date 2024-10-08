import formidable from "formidable"
import { createTweet } from "~/server/db/tweets"
import { createMediaFiles } from "~/server/db/mediaFiles"

export default defineEventHandler(async (event) => {
    // Access body
    // Not JSON because media too
    const form = formidable({})
    const response = await new Promise((resolve, reject) => {
        form.parse(event.req, (error, fields, files) => {
            if (error) {
                reject(error)
            }
            resolve({ fields, files })
        })
    })

    const { fields, files } = response
    const userId = event.context?.auth?.user?.id

    const tweetData = {
        authorId: userId,
        text: fields.text,
    }

    const tweet = await createTweet(tweetData)

    const filePromises = Object.keys(files).map(async key => {
        return createMediaFiles({
            url: "",
            providerPublicId: "randomId",
            userId: userId,
            tweetId: tweet.id
        })
    })

    await Promise.all(filePromises)

    return {
        // tweet: tweet
        files
    }
})