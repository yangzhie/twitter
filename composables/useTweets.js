// Taking input from frontend to relay to backend
export default () => {
    const usePostTweetModal = () => useState('post_tweet_modal', () => false)

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = false
    }

    const openPostTweetModal = (tweet = null) => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = true
    }

    const postTweet = (formData) => {
        const form = new FormData()

        form.append('text', formData.text)
        form.append('replyTo', formData.replyTo)

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append(`media_file_${index}`, mediaFile);
        });

        return useFetchAPI('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }

    const getHomeTweets = (params = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchAPI('/api/tweets', {
                    method: 'GET',
                    params
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getTweetById = (tweetId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchAPI(`/api/tweets/${tweetId}`)

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        postTweet,
        getHomeTweets,
        getTweetById,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal
    }
}