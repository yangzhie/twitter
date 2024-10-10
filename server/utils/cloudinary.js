import fs from 'fs';
import { v2 as _cloudinary } from "cloudinary"

const cloudinary = () => {
    // Access to env vars
    const config = useRuntimeConfig()

    _cloudinary.config({
        cloud_name: config.cloudinaryCloudName,
        api_key: config.cloudinaryAPIKey,
        api_secret: config.cloudinaryAPISecret,
    })

    return _cloudinary
}

export const upload = (imagePath) => {
    return new Promise((resolve, reject) => {
        try {
            // Check if the file exists
            if (!fs.existsSync(imagePath)) {
                return reject(new Error(`File not found at path: ${imagePath}`));
            }

            // Check if the file has read permissions
            fs.accessSync(imagePath, fs.constants.R_OK);

            // If file exists and is readable, proceed with upload
            cloudinary().uploader.upload(imagePath, (error, data) => {
                if (error) {
                    return reject(error);
                }
                resolve(data);
            });

        } catch (err) {
            // If there's any issue with accessing the file, catch the error
            reject(new Error(`Permission error or file does not exist: ${err.message}`));
        }
    })
}