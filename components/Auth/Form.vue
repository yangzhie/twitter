<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div v-if="formMode === 'login'" class="pt-5 space-y-6">
            <!-- incoming data from child -->
            <!-- transfer username into data object's username -->
            <!-- v-model 2-way binds the input form and component's data -->
            <UIInput label="Username" placeholder="@username" v-model="data.username" />
            <UIInput label="Password" placeholder="********" type="password" v-model="data.password" />

            <UIButton @click="handleLogin" liquid :disabled="loginIsDisabled">
                Login
            </UIButton>

            <div>
                Don't have an account? <span @click="handleFormToggle" class="cursor-pointer underline">Register</span>
            </div>
        </div>

        <div v-else class="pt-5 space-y-6">
            <UIInput label="Username" placeholder="@username" v-model="data.registerUsername" />
            <UIInput label="Email" placeholder="E-mail" v-model="data.registerEmail" />
            <UIInput label="Name" placeholder="Name" v-model="data.registerName" />
            <UIInput label="Password" placeholder="********" type="password" v-model="data.registerPassword" />
            <UIInput label="Repeat Password" placeholder="********" type="password" v-model="data.registerRepeatPassword" />

            <UIButton @click="handleRegister" liquid :disabled="registerIsDisabled">
                Register
            </UIButton>

            <div>
                Have an account already? <span @click="handleFormToggle" class="cursor-pointer underline">Login</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const formMode = ref('login')

const handleFormToggle = () => {
    formMode.value = formMode.value === 'login' ? 'register' : 'login'
}

// new object to unify inputs
const data = reactive({
    username: "",
    password: "",
    registerUsername: "",
    registerEmail: "",
    registerName: "",
    registerPassword: "",
    registerRepeatPassword: "",
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

        window.location.reload()
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

async function handleRegister() {
    const { register } = useAuth()

    try {
        data.loading = true 

        await register({
            username: data.registerUsername,
            email: data.registerEmail,
            name: data.registerName,
            password: data.registerPassword,
            repeatPassword: data.registerRepeatPassword,
        })

        window.location.reload()
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

const loginIsDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
})

const registerIsDisabled = computed(() => {
    return (!data.registerUsername || !data.registerEmail || !data.registerName || !data.registerPassword || !data.registerRepeatPassword) || data.loading
})
</script>