<template>
    <div>
        <label for="" v-if="props.label"
        class="block pl-3 ml-px text-sm font-medium text-gray-700"
        >
            {{ props.label }}
        </label>

        <div class="mt-1">
            <!-- listens for the native input event -->
            <!-- captures the event, extracts new .value, update:modelValue is called -->
            <input 
                @input="event => emits('update:modelValue', event.target.value)"
                :value="props.modelValue" 
                class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus-border-blue-500 sm:text-sm"
                :placeholder="props.placeholder"
                :type="props.type"
            >
        </div>
    </div>
</template>

<script setup>
// custom event that component can emit
// whenever input is changed, the change gets passed to parent
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "text"
    },
    label: {
        type: String,
        default: null
    }
})
</script>