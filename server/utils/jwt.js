import jwt from "jsonwebtoken"

const genAccessToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.ACCESSTOKEN, {
        expiresIn: "90000m"
    })
}

// const genRefreshToken = (user) => {
//     const config = useRuntimeConfig()

//     return jwt.sign({ userId: user.id }, config.REFRESHTOKEN, {
//         expiresIn: "90000m"
//     })
// }

export const genTokens = (user) => {
    const accessToken = genAccessToken(user)
    // const refreshToken = genRefreshToken(user)

    return { accessToken: accessToken, }
}

export const decodeAccessToken = (token) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.ACCESSTOKEN)
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}