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
    
    const replyTo = fields.replyTo

    // Check if replyTo is valid and not an array containing "undefined" or a string "undefined"
    if (replyTo && replyTo !== "null" && replyTo !== "undefined" && !(Array.isArray(replyTo) && replyTo[0] === "undefined")) {
        tweetData.replyToId = String(Array.isArray(replyTo) ? replyTo[0] : replyTo); // Handle both array and string cases
    }

    const tweet = await createTweet(tweetData)
    
    // Bug fixed after eons!!
    // Looks like it was just not very accepting of Object.keys
    const fileArray = files["file"];
    if (fileArray && Array.isArray(fileArray) && fileArray.length > 0) {
        const file = fileArray[0];
        const filePath = file.filepath;

        // Handle file upload
        const cloudinaryRes = await upload(filePath);

        await createMediaFiles({
            url: cloudinaryRes.secure_url,
            providerPublicId: cloudinaryRes.public_id,
            userId: userId,
            tweetId: tweet.id,
        });
    }
    
    return {
        tweet
    }
})