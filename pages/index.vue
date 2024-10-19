<template>
    <div>
        <!-- here, :loading is dynamic, allowing the value to change or be computed -->
        <MainSection title="Home" :loading="loading">
            <Head>
                <Title>Home / Twitter</Title>
            </Head>

            <div class="border-b" :class="twitterBorderColor">
                <TweetForm :user="user" @on-success="handleFormSuccess" />
            </div>

            <TweetListFeed :tweets="homeTweets" />
        </MainSection>
    </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig()

const { getHomeTweets } = useTweets()

const loading = ref(false)
const homeTweets = ref([])

const { useAuthUser } = useAuth()

const user = useAuthUser()

const fetchTweets = async () => {
    loading.value = true
    try {
        const { tweets } = await getHomeTweets()
        homeTweets.value = tweets
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onBeforeMount(fetchTweets)

const handleFormSuccess = (tweet) => {    
    navigateTo({
        path: `/status/${tweet.id}`
    })
}

// This redirects to the newly created tweet's page
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