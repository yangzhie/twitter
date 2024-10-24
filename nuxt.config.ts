// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['@heroicons/vue']
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/main.css'],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    ACCESSTOKEN: process.env.ACCESSTOKEN,
    REFRESHTOKEN: process.env.REFRESHTOKEN,
    cloudinaryCloudName: process.env.cloudinaryCloudName,
    cloudinaryAPIKey: process.env.cloudinaryAPIKey,
    cloudinaryAPISecret: process.env.cloudinaryAPISecret,
  }
})
