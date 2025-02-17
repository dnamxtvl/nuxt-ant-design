<template>
  <div class="custom-pagination">
    <ClientOnly>
      <a-pagination
        v-model:current="localPage"
        show-quick-jumper
        :total="totalItem"
        :page-size="perPageSize"
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

    const onChange = (page: number) => {
      localPage.value = page;
      emit("onChange", page);
    };

    const onChangeSize = (current: number, size: number) => {
      emit("onChangeSize", size);
    };

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
