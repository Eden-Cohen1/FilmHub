// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
  },

  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@element-plus/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/image-edge",
    "@nuxt/image",
    "nuxt-gtag",
  ],
  plugins: ["@/plugins/youtube.client.js"],
  css: [
    "~/assets/main.css",
    "~/node_modules/lite-youtube-embed/src/lite-yt-embed.css",
  ],
  googleFonts: {
    families: {
      Montserrat: true,
      "Open+Sans": true,
      Roboto: true,
      Lato: true,
      "Space+Mono": true,
      Poppins: true,
      Playpen: true,
      "Playpen+Sans": true,
    },
  },
  image: {
    format: ["webp"],
    providers: {
      random: {
        provider: "netlify",
        netlify: {
          baseURl: "",
        },
      },
    },
  },
});
