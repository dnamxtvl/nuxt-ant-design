<template>
  <a-layout-header class="custom-header">
    <menu-unfold-outlined
      v-if="collapsedHeader"
      class="trigger"
      @click="collapsedHeader = !collapsedHeader"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="collapsedHeader = !collapsedHeader"
    />
    <a-dropdown>
      <a-avatar
        class="avatar cursor-pointer"
        size="large"
        :src="'/img/avatars/14.png'"
      ></a-avatar>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <user-outlined class="ant-dropdown-menu-title-content-custom" />
            {{ $t("profile") }}
          </a-menu-item>
          <a-menu-item key="2">
            <setting-outlined class="ant-dropdown-menu-title-content-custom" />
            {{ $t("settings") }}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" @click="logout">
            <logout-outlined class="ant-dropdown-menu-title-content-custom" />
            {{ $t("logout") }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>
<script lang="ts">
import { FETCH_API } from "~/constants/config/api";
import helperApp from "~/utils/helper";
import { ROUTE_APP } from "~/constants/config/route";
import { customFetch } from "~/composables/custom-fetch";

export default defineComponent({
  name: "Header",
  components: {},
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:collapsed"],
  setup(props, { emit }) {
    const collapsedHeader = computed({
      get: () => props.collapsed,
      set: (value) => emit("update:collapsed", value),
    });

    const logout = async () => {
      try {
        await customFetch(FETCH_API.AUTH.LOGOUT, {
          method: "post",
        });
        helperApp.logOutWhenTokenExpired();
        return navigateTo(ROUTE_APP.AUTH.LOGIN);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {});

    return {
      collapsedHeader,
      logout,
    };
  },
});
</script>
<style scoped>
.custom-header {
  background: white;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 64px;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
</style>
