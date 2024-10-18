<template>
    <div>
        <TweetItem :tweet="props.tweet" />

        <TweetForm 
            :reply-to="props.tweet" 
            placeholder="Tweet your reply..." 
            :user="props.user" 
            @on-success="handleFormSuccess" 
        />

        <TweetListFeed :tweets="replies" />
    </div>
</template>

<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
})

const replies = computed(() => props.tweet?.replies || [])

const handleFormSuccess = (tweet) => {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>