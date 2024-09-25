<template>
    <div>
        <div class="pt-5 space-y-6">
            <!-- incoming data from child -->
            <!-- transfer username into data object's username -->
            <!-- v-model 2-way binds the input form and component's data -->
            <UIInput label="Username" placeholder="@username" v-model="data.username" />
            <UIInput label="Password" placeholder="********" type="password" v-model="data.password" />

            <div>
                <button @click="handleLogin">Submit</button>
            </div>
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
</script>