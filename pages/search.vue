<template>
    <div>
        <!-- here, :loading is dynamic, allowing the value to change or be computed -->
        <MainSection title="Search" :loading="loading">

            <Head>
                <Title>Search</Title>
            </Head>

            <TweetListFeed :tweets="searchTweets" />
        </MainSection>
    </div>
</template>

<script setup>
const { getHomeTweets } = useTweets()


const loading = ref(false)
const searchTweets = ref([])

const route = useRoute()
const router = useRouter()

const fetchTweets = async (query) => {
    loading.value = true
    try {
        const { tweets } = await getHomeTweets({ query })
        searchTweets.value = tweets
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

// Watch for changes in the query parameter
watch(() => route.query.q, (newQuery) => {
    if (newQuery) {
        fetchTweets(newQuery) // Fetch tweets when the query changes
    } else {
        searchTweets.value = [] // Clear tweets if there's no query
    }
})

// Fetch initial tweets on mount if there's a query
onBeforeMount(() => {
    const initialQuery = route.query.q
    if (initialQuery) {
        fetchTweets(initialQuery)
    }
})
</script>