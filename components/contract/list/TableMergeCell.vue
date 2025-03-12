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
            <td rowspan="3" class="ant-table-cell">
              {{ item.tuika_kbn == 0 ? $t("other_label") : $t("scorpion") }}
            </td>
            <td rowspan="2" class="ant-table-cell text-primary">
              <nuxt-link :to="item.keiyaku_card_url">{{
                item.keiyaku_no ?? $t("unnumbered")
              }}</nuxt-link>
            </td>
            <td colspan="3" class="ant-table-cell">{{ item.keiyakusya_name }}</td>
            <td class="ant-table-cell">{{ $t("contract_conclusion") }}</td>
            <td class="ant-table-cell">
              {{
                item.keiyaku_teiketsu_yotei_date
                  ? formatDate(item.keiyaku_teiketsu_yotei_date)
                  : ""
              }}
            </td>
            <td class="ant-table-cell">
              {{
                item.jyutyu_keijyou_yotei_date
                  ? formatDate(item.jyutyu_keijyou_yotei_date)
                  : ""
              }}
            </td>
          </tr>
          <tr>
            <td class="ant-table-cell">{{ item.keiyaku_kbn_name }}</td>
            <td class="ant-table-cell">{{ item.kouji_bukken_name }}</td>
            <td rowspan="2" class="ant-table-cell">{{ item.syounin_zyoukyou }}</td>
            <td class="ant-table-cell">{{ $t("contract_accounting") }}</td>
            <td class="ant-table-cell">
              {{
                item.keiyaku_keijyou_yotei_date
                  ? formatDate(item.keiyaku_keijyou_yotei_date)
                  : ""
              }}
            </td>
            <td class="ant-table-cell">
              {{ item.keiyaku_keijyou_date ? formatDate(item.keiyaku_keijyou_date) : "" }}
            </td>
          </tr>
          <tr>
            <td class="ant-table-cell">{{ item.keiyaku_status_name }}</td>
            <td
              class="ant-table-cell"
              v-if="
                item.keiyaku_card_syubetsu_cd == KEIYAKU_CARD_SYUBETSU_CD.KENCHIKU ||
                item.keiyaku_card_syubetsu_cd == KEIYAKU_CARD_SYUBETSU_CD.MANSION ||
                item.keiyaku_card_syubetsu_cd == KEIYAKU_CARD_SYUBETSU_CD.TSUIKA
              "
            >
              {{
                item.jyutyu_yotei_tsuki_sekininsya
                  ? formatDate(item.jyutyu_yotei_tsuki_sekininsya, "YYYY/MM")
                  : ""
              }}
            </td>
            <td class="ant-table-cell" v-else>-</td>
            <td class="ant-table-cell">{{ item.zeikomi_keiyaku_kingaku }}</td>
            <td class="ant-table-cell">{{ $t("order_booking") }}</td>
            <td class="ant-table-cell">
              {{
                item.jyutyu_keijyou_yotei_date
                  ? formatDate(item.jyutyu_keijyou_yotei_date)
                  : ""
              }}
            </td>
            <td class="ant-table-cell">
              {{ item.jyutyu_keijyou_date ? formatDate(item.jyutyu_keijyou_date) : "" }}
            </td>
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
import { KEIYAKU_CARD_SYUBETSU_CD } from "~/constants/enums/contract";
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
    return {
      KEIYAKU_CARD_SYUBETSU_CD,
    };
  },
});
</script>
<style scoped lang="scss">
@use "~/assets/css/admin/custom-table.scss";
</style>
