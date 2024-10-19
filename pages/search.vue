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
const searchQuery = useRoute().query.q

const fetchTweets = async () => {
    loading.value = true
    try {
        const { tweets } = await getHomeTweets({
            query: searchQuery
        })
        searchTweets.value = tweets
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onBeforeMount(fetchTweets)
</script>