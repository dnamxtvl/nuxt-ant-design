<template>
  <a-layout id="custom-layout">
    <!-- Sidebar -->
    <Sidebar :collapsed="collapsed" />
    <!-- Content Area -->
    <a-layout>
      <!-- Header -->
      <Header v-model:collapsed="collapsed" />
      <!-- Main Content -->
      <a-layout-content class="custom-content">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Sidebar from "~/components/common/Sidebar.vue";
import Header from "~/components/common/Header.vue";

const collapsed = ref<boolean>(false);
const mobileWidth = 576;

onMounted(() => {
  let screenWidth = window.innerWidth;
  if (screenWidth < mobileWidth) {
    collapsed.value = true;
  }
});
</script>

<style scoped lang="scss">
@use "~/assets/css/admin/admin-dashboard.scss";
</style>
