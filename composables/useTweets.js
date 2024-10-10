// Taking input from frontend to relay to backend
export default () => {
    const postTweet = (formData) => {
        const form = new FormData()

        form.append('text', formData.text)

        if (formData.mediaFiles && formData.mediaFiles.length > 0) {
            formData.mediaFiles.forEach((mediaFile, index) => {
                form.append(`media_file_${index}`, mediaFile);
            });
        }

        return useFetchAPI('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }

    return {
        postTweet
    }
}