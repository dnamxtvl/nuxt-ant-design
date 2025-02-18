<template>
  <a-layout-sider
    v-model:collapsed="collapsedSideBar"
    :trigger="null"
    collapsible
    width="250"
    class="custom-sider"
    style="background: #fff"
  >
    <div class="ant-pro-sider-menu-logo flex items-center">
      <!-- Logo -->
      <img class="app-logo-sidebar" :src="'/img/logo.jpg'" alt="logo" />
      <!-- End Logo -->
    </div>
    <ClientOnly>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
      >
        <template v-for="item in items" :key="item.key">
          <a-sub-menu v-if="item.children && item.children.length" :key="item.key">
            <template #title>
              <component v-if="item.icon" :is="item.icon" />
              <span v-if="!collapsedSideBar">{{ $t(item.label) }}</span>
            </template>
            <a-menu-item v-for="child in item.children" :key="child.key">
              {{ $t(child.label) }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.key">
            <component v-if="item.icon" :is="item.icon" />
            <span v-if="!collapsedSideBar">{{ item.label }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </ClientOnly>
  </a-layout-sider>
</template>
<script lang="ts">
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "Sidebar",
  components: {},
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const selectedKeys = ref<string[]>(["1"]);
    const collapsedSideBar = computed(() => props.collapsed);
    const openKeys = ref<string[]>(["sub1"]);
    const items = ref([
      {
        key: "sub1",
        icon: UserOutlined,
        label: "user",
        children: [{ key: "1", label: "list" }],
      },
      {
        key: "sub2",
        icon: VideoCameraOutlined,
        label: "media",
        children: [
          { key: "2", label: "videos" },
          { key: "3", label: "images" },
        ],
      },
      {
        key: "4",
        icon: UploadOutlined,
        label: "upload",
        children: [
          { key: "5", label: "videos" },
          { key: "6", label: "images" },
        ],
      },
    ]);

    onMounted(() => {});

    return {
      selectedKeys,
      collapsedSideBar,
      openKeys,
      items,
    };
  },
});
</script>
<style scoped lang="scss">
@use "~/assets/css/admin/sidebar.scss";
</style>
