<template>
    <div>
        <!-- here, :loading is dynamic, allowing the value to change or be computed -->
        <MainSection title="Home" :loading="loading">
            Content
        </MainSection>
    </div>
</template>

<script setup>
    const loading = ref(false)
</script>