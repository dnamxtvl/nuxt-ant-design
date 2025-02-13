import tailwindcss from "@tailwindcss/vite";;

export default defineNuxtConfig({
  compatibilityDate: '2025-02-12',
  devtools: { enabled: false },
  ssr: true,
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  app: {
    head: {
      title: 'Nuxt Ant Design Tailwind',
      meta: [{ name: 'Nuxt app', content: 'Nuxt Ant Design Tailwind' }],
    },
  },
  css: [
    "~/assets/css/tailwind/main.css",
    '~/assets/fonts/fontawesome.css',
    '~/assets/fonts/tabler-icons.css',
    '~/assets/fonts/flag-icons.css',
    "~/assets/css/app.scss",
  ],
  runtimeConfig: {
    public: {
    }
  },
  modules: [
    '@ant-design-vue/nuxt',
  ],
  antd:{
    extractStyle: true
  },
  typescript: {
    strict: true,
    shim: false,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    ssr: {
      noExternal: [
        'moment',
        'compute-scroll-into-view',
        'ant-design-vue',
        '@ant-design/icons-vue',
      ],
    },
  },
})