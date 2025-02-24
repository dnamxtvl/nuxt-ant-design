<template>
  <div class="header-table-custom">
    <h1 class="title-filter">{{ $t(title) }}</h1>
    <span class="total-data">[{{ total }}{{ $t("items") }}]</span>
  </div>
  <div class="ant-table-container">
    <table class="ant-table">
      <thead class="ant-table-thead">
        <tr>
          <th rowspan="3" class="ant-table-cell">{{ $t("classification") }}</th>
          <th rowspan="2" class="ant-table-cell">{{ $t("contract_number") }}</th>
          <th colspan="3" class="ant-table-cell">
            {{ $t("contract") + "/" + $t("project_name") }}
          </th>
          <th rowspan="3" class="ant-table-cell">
            {{ $t("date_of_conclusion") }}<br />{{ $t("date_of_posting") }}
          </th>
          <th rowspan="3" class="ant-table-cell">{{ $t("schedule") }}</th>
          <th rowspan="3" class="ant-table-cell">{{ $t("achievements") }}</th>
        </tr>
        <tr>
          <th class="ant-table-cell">{{ $t("contract_category") }}</th>
          <th class="ant-table-cell">{{ $t("contractor") }}</th>
          <th rowspan="2" class="ant-table-cell">{{ $t("approval_status") }}</th>
        </tr>
        <tr>
          <th class="ant-table-cell">{{ $t("status") }}</th>
          <th class="ant-table-cell">{{ $t("scheduled_contract_month") }}</th>
          <th class="ant-table-cell">{{ $t("contract_amount_tax_yen") }}</th>
        </tr>
      </thead>
      <tbody class="ant-table-tbody">
        <template v-for="(item, index) in results" :key="index" v-if="results.length > 0">
          <tr>
            <td rowspan="3" class="ant-table-cell">{{ item.classification }}</td>
            <td rowspan="2" class="ant-table-cell">{{ item.contract_number }}</td>
            <td colspan="3" class="ant-table-cell">{{ item.project_name }}</td>
            <td class="ant-table-cell">{{ item.date_of_conclusion }}</td>
            <td class="ant-table-cell">{{ item.start_date }}</td>
            <td class="ant-table-cell"></td>
          </tr>
          <tr>
            <td class="ant-table-cell">{{ item.contract_category }}</td>
            <td class="ant-table-cell">{{ item.contractor }}</td>
            <td rowspan="2" class="ant-table-cell">{{ item.approval_status }}</td>
            <td class="ant-table-cell">{{ item.date_of_posting }}</td>
            <td class="ant-table-cell">{{ item.end_date }}</td>
            <td class="ant-table-cell"></td>
          </tr>
          <tr>
            <td class="ant-table-cell">{{ item.status }}</td>
            <td class="ant-table-cell">-</td>
            <td class="ant-table-cell">{{ item.contract_amount_tax_yen }}</td>
            <td class="ant-table-cell">{{ item.date_of_posting }}</td>
            <td class="ant-table-cell"></td>
            <td class="ant-table-cell"></td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="8" class="ant-table-cell">
            {{ $t("no_data") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { ItemListContract } from "~/types/contract/res";

export default defineComponent({
  name: "TableMergeCell",
  props: {
    results: {
      type: Array<ItemListContract>,
      required: true,
      default: [],
    },
    title: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss">
@use "~/assets/css/admin/custom-table.scss";
</style>
