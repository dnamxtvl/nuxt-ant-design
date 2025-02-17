<template>
  <a-layout id="custom-layout">
    <!-- Sidebar -->
    <Sidebar :collapsed="collapsed" />
    <!-- Content Area -->
    <a-layout>
      <!-- Header -->
      <Header v-model:collapsed="collapsed" />
      <!-- Main Content -->
      <ClientOnly>
        <contextHolder />
      </ClientOnly>
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
import { notification } from "ant-design-vue";

const [contextHolder] = notification.useNotification();
const collapsed = ref<boolean>(false);
</script>

<style scoped>
#custom-layout {
  height: 100vh;
}

.custom-sider {
  height: 100vh;
  background: #001529;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
}

.custom-content {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
  padding-top: 1rem;
  overflow: auto;
}
</style>
