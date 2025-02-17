<template>
  <h1 class="text-2xl font-semibold title-screen">{{ titleScreen }}</h1>
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
