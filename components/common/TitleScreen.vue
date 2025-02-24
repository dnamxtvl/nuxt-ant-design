<template>
  <div class="header-table-custom">
    <h1 class="text-2xl font-semibold title-screen">{{ $t(titleScreen) }}</h1>
    <span class="total-data" v-if="contractNumber">{{ contractNumber }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TitleScreen",
  props: {
    titleScreen: {
      type: String,
      required: true,
    },
    contractNumber: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.title-screen {
  color: #000;
  margin-bottom: 1rem;
}
</style>
