import { getQuery } from 'h3'
import { getTweets } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet"

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event)

    let prisma = {
        include: {
            author: true,
            mediaFiles: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo: {
                include: {
                    author: true
                }
            },
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ]
    }

    if (!!query) {
        prisma = {
            ...prisma,
            where: {
                text: {
                    contains: query
                }
            }
        }
    }
    
    const tweets = await getTweets(prisma)

    return {
        tweets: tweets.map(tweetTransformer)
    }
})