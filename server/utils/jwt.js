import jwt from "jsonwebtoken"

const genAccessToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.ACCESSTOKEN, {
        expiresIn: "20m"
    })
}

export const decodeAccessToken = (token) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.ACCESSTOKEN)
    } catch (error) {
        return null
    }
}

const genRefreshToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.REFRESHTOKEN, {
        expiresIn: '10h'
    })
}

export const decodeRefreshToken = (token) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.REFRESHTOKEN)
    } catch (error) {
        return null
    }
}

export const genTokens = (user) => {
    const accessToken = genAccessToken(user)
    const refreshToken = genRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const sendRefreshToken = (event, token) => {
    setCookie(event, "refresh_token", token, {
        httpOnly: true,
        sameSite: true
    })
} 