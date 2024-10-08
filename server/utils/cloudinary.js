import { v2 as _cloudinary } from "cloudinary"

const cloudinary = () => {
    // Access to env vars
    config = useRuntimeConfig()

    _cloudinary.config({
        cloud_name: config.cloudinaryCloudName,
        api_key: config.cloudinaryAPIKey,
        api_secret: config.cloudinaryAPISecret,
    })

    return _cloudinary
}

export const upload = () => {
    return new Promise((resolve, reject) => {
        cloudinary().uploader.upload(image, (error, data) => {
            if (error) {
                reject(error)
            }
            resolve(data)
        })
    })
}