<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-[9999]"
  >
    <a-spin size="large" :tip="$t('loading') + '...'"></a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FullScreenLoader",
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
