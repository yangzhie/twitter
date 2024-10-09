<template>
    <div>
        <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
    </div>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const handleFormSubmit = (data) => {
    console.log(data)
}
</script>