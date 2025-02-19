<template>
  <h1 class="title-filter">{{ $t(title) }}</h1>
  <a-table
    :columns="columns"
    :data-source="results"
    :pagination="false"
    :scroll="{ x: true }"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> {{ $t("name") }} </span>
      </template>
      <template v-else>
        <span> {{ $t(title) }} </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ $t(record.name) }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { TableColumnsType } from "ant-design-vue";

export default defineComponent({
  name: "TableResult",
  props: {
    columns: {
      type: Array as PropType<TableColumnsType>,
      required: true,
    },
    results: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
