<template>
  <div class="custom-pagination">
    <ClientOnly>
      <a-pagination
        v-model:current="localPage"
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
    currentPageApp: {
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
    const localPage = ref<number>(props.currentPageApp);
    const isChangingPageSize = ref<boolean>(false);

    const onChange = (page: number) => {
      if (!isChangingPageSize.value) {
        localPage.value = page;
        emit("onChange", page);
      }
      isChangingPageSize.value = false;
    };

    const onChangeSize = (current: number, size: number) => {
      isChangingPageSize.value = true;
      localPage.value = 1;
      emit("onChangeSize", size);
      emit("onChange", 1);
    };

    onMounted(() => {
      isChangingPageSize.value = false;
    });

    return {
      localPage,
      onChange,
      onChangeSize,
    };
  },
});
</script>

<style scoped>
.custom-pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: end;
}
</style>
