<template>
    <div>
        <div class="flex items-center flex-shrink-0 p-4 pb-0">
            <div class="flex w-12 items-top">
                <img :src="props.user?.profileImage" class="inline-block w-10 h-10 rounded-full" alt="Profile Image">
            </div>

            <div class="w-full p-2">
                <textarea 
                    class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
                    v-model="text"
                />
            </div>
        </div>

        <div>
            <button @click="handleFormSubmit">Tweet</button>
        </div>
    </div>
</template>

<script setup>
const text = ref("")
const emits = defineEmits(['onSubmit'])

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const handleFormSubmit = () => {
    emits('onSubmit', {
        text: text.value
    })
}
</script>