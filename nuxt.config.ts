export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },

  compatibilityDate: '2025-03-28'
})