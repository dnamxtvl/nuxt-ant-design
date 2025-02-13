<template>
  <div>
    <a-breadcrumb class="breadcrumb ant-breadcrumb-arrow-no-separator">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-box text-red-500">Content</div>
  </div>
</template>

<script lang="ts">
definePageMeta({
  layout: "admin-dashboard",
});

export default defineComponent({
  components: {},
  setup() {
    const showContent = ref(false);

    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        showContent.value = true;
      } catch (error) {
        console.error("Lỗi tải dữ liệu", error);
      }
    }

    onMounted(async () => {
      await fetchData();
    });

    return {
      showContent,
    };
  },
});
</script>
<style scoped></style>
