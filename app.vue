<template>
  <div v-show="appLoaded">
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
