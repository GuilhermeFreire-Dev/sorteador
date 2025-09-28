// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["shadcn-nuxt"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  ssr: false,
  app: {
    head: {
      title: "Sorteador",
      htmlAttrs: {
        lang: "pt-BR",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        { name: "google-adsense-account", content: "ca-pub-6227277450756568" },
        { name: "google-site-verification", content: "63Mli8fzoSjnrqM7Iw7-fs2gTyA9Q6S4Ewf4L34-CNY" }
      ],
      script: [
        {
          async: true,
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6227277450756568",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
