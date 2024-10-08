import formidable from "formidable"
import { createTweet } from "~/server/db/tweets"
import { createMediaFiles } from "~/server/db/mediaFiles"
import { upload } from "~/server/utils/cloudinary"

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
        const file = files[key]

        const cloudinaryRes = await upload(file.filepath)
        // console.log(response)

        return createMediaFiles({
            url: cloudinaryRes.secure_url,
            providerPublicId: cloudinaryRes.public_id,
            userId: userId,
            tweetId: tweet.id
        })
    })

    await Promise.all(filePromises)

    return {
        tweet: tweet
    }
})