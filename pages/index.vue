<template>
    <div>
        <!-- here, :loading is dynamic, allowing the value to change or be computed -->
        <MainSection title="Home" :loading="loading">
            {{ user }}
        </MainSection>
    </div>
</template>

<script setup>
const loading = ref(false)
const { useAuthUser } = useAuth()

const user = useAuthUser()
</script>