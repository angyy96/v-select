// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "VSelect component's playground",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
})
