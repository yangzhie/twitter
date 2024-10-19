<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div class="pt-5 space-y-6">
            <!-- incoming data from child -->
            <!-- transfer username into data object's username -->
            <!-- v-model 2-way binds the input form and component's data -->
            <UIInput label="Username" placeholder="@username" v-model="data.username" />
            <UIInput label="Password" placeholder="********" type="password" v-model="data.password" />

            <UIButton @click="handleLogin" liquid :disabled="isDisabled">
                Login
            </UIButton>
        </div>
    </div>
</template>

<script setup>
// new object to unify inputs
const data = reactive({
    username: "",
    password: "",
    loading: false
})

async function handleLogin() {
    const { login } = useAuth()
    
    try {
        data.loading = true
        
        await login({
            username: data.username,
            password: data.password
        })
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

const isDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
})
</script>