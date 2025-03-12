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
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalItem: {
      type: Number,
      default: 0,
    },
    perPageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    const isChangingPageSize = ref<boolean>(false);

    const onChange = (page: number) => {
      if (!isChangingPageSize.value) {
        emit("onChange", page);
      }
      isChangingPageSize.value = false;
    };

    const onChangeSize = (current: number, size: number) => {
      isChangingPageSize.value = true;
      emit("onChangeSize", size);
      emit("onChange", 1);
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
