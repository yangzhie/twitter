<template>
    <div>
        <TweetItemHeader :tweet="props.tweet" />

        <div class="ml-16">
            <p class="flex-shrink font-medium text-gray-800 dark:text-white">
                {{ tweetText(props.tweet.text) }}
            </p>

            <div 
                v-for="image in tweet.mediaFiles" 
                :key="image.id"
                class="flex my-3 mr-2 border-2 rounded-2xl"
                :class="twitterBorderColor"
            >
                <img :src="image.url" class="w-full rounded-2xl"/>
            </div>

            <div class="mt-2">
                <TweetItemActions :tweet="props.tweet" />
            </div>
        </div>
    </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig()

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    }
})

// Function to remove first [", last "], and keep the rest of the string intact
const tweetText = (text) => text.replace(/^\["|"\]$/g, '');
</script>