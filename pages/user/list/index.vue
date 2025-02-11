<template>
  <div>
    <a-breadcrumb class="breadcrumb ant-breadcrumb-arrow-no-separator">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-box">Content</div>
  </div>
</template>

<script lang="ts">
definePageMeta({
  layout: "admin-dashboard",
});

export default defineComponent({
  components: {},
  setup() {
    onMounted(async () => {});

    return {};
  },
});
</script>
<style scoped></style>
