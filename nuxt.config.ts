import tailwindcss from "@tailwindcss/vite";;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
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
  css: ["~/assets/css/main.scss", "~/assets/css/app.css"],
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
