import formidable from "formidable"
import { createTweet } from "~/server/db/tweets"
import { createMediaFiles } from "~/server/db/mediaFiles"
import { upload } from "~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {
    // Access body
    // Not JSON because media too
    const form = formidable({})
    const response = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (error, fields, files) => {
            if (error) {
                return reject(error)
            }
            resolve({ fields, files })
        })
    })

    const { fields, files } = response
    const userId = event.context?.auth?.user?.id

    
    const tweetData = {
        authorId: userId,
        text: JSON.stringify(fields.text),
    }
    
    const tweet = await createTweet(tweetData)
    
    // Bug fixed after eons!!
    // Looks like it was just not very accepting of Object.keys
    const fileArray = files["file"];
    const file = fileArray[0];
    const filePath = file.filepath

    const filePromises = async () => {
        const cloudinaryRes = await upload(filePath)

        return createMediaFiles({
            url: cloudinaryRes.secure_url,
            providerPublicId: cloudinaryRes.public_id,
            userId: userId,
            tweetId: tweet.id
        })
    }

    filePromises()

    return {
        tweet
    }
})