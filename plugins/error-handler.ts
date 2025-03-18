export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('vue:error', (err) => {
        logger.error(err as Object);
    })
});