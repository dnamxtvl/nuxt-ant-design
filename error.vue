<template>
  <div class="h-screen flex items-center justify-center">
    <a-result
      v-show="appLoaded"
      :status="error.statusCode"
      :title="error.statusCode"
      :sub-title="getMsgError(error.statusCode)"
    >
      <template #extra>
        <nuxt-link :to="ROUTE_APP.CONTRACT.LIST"><a-button type="primary" class="mt-4">Go Home</a-button></nuxt-link>
      </template>
    </a-result>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";
import { ERR_MESSAGE } from "./constants/config/application";
import { ROUTE_APP } from "./constants/config/route";

const props = defineProps({
  error: Object as () => NuxtError,
});

const appLoaded = ref(false);
const getMsgError = (statusCode: number) => {
  return ERR_MESSAGE[statusCode] || "An error occurred";
};

onMounted(() => {
  requestAnimationFrame(() => {
    appLoaded.value = true;
  });
});
</script>
