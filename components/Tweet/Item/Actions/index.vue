<template>
    <div class="flex items-center justify-around w-full">
        <TweetItemActionsIcon color="blue" :size="size">
            <!-- Powerful, advanced technique -->
            <template v-slot:icon="{classes}">
                <ChatIcon :class="classes" />
            </template>

            <template v-slot:default>
                {{ props.tweet.repliesCount }}
            </template>
        </TweetItemActionsIcon>

        <TweetItemActionsIcon color="green" :size="size">
            <template v-slot:icon="{classes}">
                <RefreshIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                <span>
                    {{ genRandomNum() }}
                </span>
            </template>
        </TweetItemActionsIcon>

        <TweetItemActionsIcon color="red" :size="size">
            <template v-slot:icon="{classes}">
                <HeartIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                <span>
                    {{ genRandomNum() }}
                </span>
            </template>
        </TweetItemActionsIcon>

        <TweetItemActionsIcon color="blue" :size="size">
            <template v-slot:icon="{classes}">
                <UploadIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                <span>
                    {{ genRandomNum() }}
                </span>
            </template>
        </TweetItemActionsIcon>
    </div>
</template>

<script setup>
import { ChatIcon, RefreshIcon, HeartIcon, UploadIcon } from '@heroicons/vue/outline'

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    compact: {
        type: Boolean,
        default: false
    }
})

const genRandomNum = () => {
    return Math.floor(Math.random() * 100)
}

const showStats = computed(() => props.compact)
const size = computed(() => props.compact ? 5 : 6)
</script> 