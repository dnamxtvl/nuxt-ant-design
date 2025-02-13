<template>
  <div class="app-conatiner" v-if="appLoaded">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const appLoaded = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    appLoaded.value = true;
  });
});
</script>
