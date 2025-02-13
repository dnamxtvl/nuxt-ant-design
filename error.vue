<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
    <div class="max-w-md">
      <img
        src="/img/illustrations/19.svg"
        alt="404 Not Found"
        class="mx-auto w-60 mb-6"
      />
      <h1 class="text-3xl font-bold text-gray-800">{{ error.statusCode }}</h1>
      <p class="text-gray-500 mt-2">{{ getMsgError(error.statusCode) }}</p>
      <a-button type="primary" class="mt-4" @click="handleError">Go Home</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";
import { ERR_MESSAGE } from "./constants/config/application";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });

const getMsgError = (statusCode: number) => {
  return ERR_MESSAGE[statusCode] || "An error occurred";
};
</script>
