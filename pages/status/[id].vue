<template>
    <div>
        <MainSection title="Tweet" :loading="loading">
            <Head>
                <Title></Title>
            </Head>

            <TweetDetails :user="user" :tweet="tweet" />
        </MainSection>
    </div>
</template>

<script setup>
const loading = ref(false)
const tweet = ref(null)
const { getTweetById } = useTweets()

const { useAuthUser } = useAuth()
const user = useAuthUser()

const router = useRouter()

watch(() => router.currentRoute.value.params.id, (newId, oldId) => {
    if (newId !== oldId) {
        getTweet(newId) // Only fetch the tweet if the ID changes
    }
})

const getTweet = async (tweetId) => {
    if (!tweetId) return // Check if tweetId exists

    loading.value = true
    try {
        const response = await getTweetById(tweetId)
        console.log(response)
        tweet.value = response.tweet
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onBeforeMount(() => {
    getTweet(router.currentRoute.value.params.id) // Get ID from the current route
})
</script>