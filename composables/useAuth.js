import { jwtDecode } from "jwt-decode";

export default () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('auth_loading', () => true)

    const setToken = (newToken) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const login = ({ username, password }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        username,
                        password
                    }
                })

                setToken(data.access_token)
                setUser(data.user)

                resolve(true)
            } catch (error) {
                // Reject with the error so it can be handled in the calling function
                reject(error.response.statusText)
            }
        })
    }

    const register = ({ username, email, name, password, repeatPassword }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/register', {
                    method: 'POST',
                    body: {
                        username,
                        email,
                        name,
                        password,
                        repeatPassword,
                    }
                })

                setToken(data.access_token)
                setUser(data.user)

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh')

                setToken(data.access_token)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchAPI('/api/auth/user')

                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const refreshRefreshAccessToken = () => {
        const authToken = useAuthToken()

        if (!authToken.value) {
            return
        }

        const jwt = jwtDecode(authToken.value)

        const newRefreshTime = jwt.exp - 60000

        setTimeout(async () => {
            await refreshToken()
            refreshRefreshAccessToken()
        }, newRefreshTime);
    }

    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setIsAuthLoading(true)
            try {
                await refreshToken()
                await getUser()

                refreshRefreshAccessToken()

                resolve(true)
            } catch (error) {
                console.log(error)
                reject(error)
            } finally {
                setIsAuthLoading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchAPI('/api/auth/logout', {
                    method: 'POST'
                })
                setToken(null)
                setUser(null)

                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        useAuthLoading,
        logout,
        register
    }
}