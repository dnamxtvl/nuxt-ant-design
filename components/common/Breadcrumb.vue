<template>
  <a-breadcrumb class="breadcrumb ant-breadcrumb-arrow-no-separator">
    <a-breadcrumb-item v-for="(item, index) in itemBreads" :key="index">
      <nuxt-link :to="item.link" v-if="index < itemBreads.length - 1">{{
        item.name
      }}</nuxt-link>
      <span v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Breadcrumb",
  props: {
    itemBreads: {
      type: Array<{
        name: string;
        link: string;
      }>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.ant-breadcrumb-arrow-no-separator {
  margin-bottom: 0.5rem;
}
</style>
