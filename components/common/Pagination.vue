<template>
  <div class="custom-pagination">
    <ClientOnly>
      <a-pagination
        :current="currentPage"
        show-quick-jumper
        :total="totalItem"
        :page-size="perPageSize"
        :locale="{ items_per_page: $t('page'), jump_to: $t('go_to_page') }"
        @change="onChange"
        @show-size-change="onChangeSize"
      />
    </ClientOnly>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "nuxt/app";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "~/constants/config/application";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: DEFAULT_PAGE,
    },
    totalItem: {
      type: Number,
      default: 0,
    },
    perPageSize: {
      type: Number,
      default: DEFAULT_PER_PAGE,
    },
    keepUrl: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const isChangingPageSize = ref<boolean>(false);

    const onChange = (page: number) => {
      if (!isChangingPageSize.value) {
        updateUrl({ ...route.query, page }, props.keepUrl);
        emit("onChange", page);
      }

      isChangingPageSize.value = false;
    };

    const onChangeSize = (current: number, size: number) => {
      isChangingPageSize.value = true;
      updateUrl({ ...route.query, page: DEFAULT_PAGE, limit: size }, props.keepUrl);

      emit("onChangeSize", size);
      emit("onChange", DEFAULT_PAGE);
    };

    onMounted(() => {
      isChangingPageSize.value = false;
    });

    return {
      onChange,
      onChangeSize,
    };
  },
});
</script>
<style scoped lang="scss">
@use "~/assets/css/admin/pagination.scss";
</style>
