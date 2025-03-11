<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen titleScreen="list_user" contractNumber="GCNT90013" />
    <!-- Content -->
    <!-- Filter -->
    <FormSearch
      title="filter"
      :numBasicFilter="12"
      :fields="searchFields"
      :fieldsDisabledForm="fieldsDisabled"
      @submit="handleSearch"
      @handleClear="handleResetFilter"
    />
    <!-- End Filter -->
    <div class="content-box">
      <!-- Table -->
      <TableMergeCell title="search_result" :total="100" :results="data" />
      <!-- End Table -->
      <!-- pagination -->
      <Pagination
        :currentPageApp="currentPage"
        :totalItem="total"
        @onChange="onChangePage"
        :perPageSize="pagePage"
        @onChangeSize="onChangePerPage"
      />
      <!-- End Pagination -->
    </div>
    <!-- End Content -->
  </div>
</template>

<script lang="ts">
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import TitleScreen from "~/components/common/TitleScreen.vue";
import { ref } from "vue";
import Pagination from "~/components/common/Pagination.vue";
import Breadcrumb from "~/components/common/Breadcrumb.vue";
import type { ItemBreadcrumb, ItemFormSearch } from "~/types/common/res";
import FormSearch from "~/components/common/FormSearch.vue";
import { useI18n } from "vue-i18n";
import TableResult from "~/components/common/TableResult.vue";
import TableMergeCell from "~/components/contract/list/TableMergeCell.vue";
import type { ItemListContract } from "~/types/contract/res";

definePageMeta({
  layout: "admin-dashboard",
});

export default {
  components: {
    DownOutlined,
    UpOutlined,
    TitleScreen,
    Pagination,
    Breadcrumb,
    FormSearch,
    TableResult,
    TableMergeCell,
  },
  setup() {
    const i18n = useI18n();
    const itemBreadcrumbs = ref<ItemBreadcrumb[]>([
      {
        name: "home",
        link: "/",
      },
      {
        name: "list",
        link: "/user/list",
      },
    ]);
    const currentPage = ref<number>(1);
    const total = ref<number>(500);
    const onChangePage = (pageNumber: number) => {
      currentPage.value = pageNumber;
      console.log("currentPage", currentPage.value);
      console.log("perPage", pagePage.value);
    };
    const pagePage = ref<number>(10);
    const onChangePerPage = (perPage: number) => {
      pagePage.value = perPage;
    };

    const expand = ref<boolean>(false);

    const handleSearch = (formState: Record<string, any>) => {
      console.log("formState", formState.keyword);
    };

    const handleResetFilter = () => {
      console.log("handleResetFilter");
    };

    const fieldsDisabled = ref<string[]>([
      "email",
      "jyutyu_jigyousyo_name",
      "syoukai_card_syutoku",
    ]);
    const searchFields: ItemFormSearch[] = [
      {
        name: "keiyaku_no",
        label: "contract_number",
        type: "text",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "kouji_name",
        label: "project_name",
        type: "text",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyaku_status",
        label: "contract_status",
        type: "select",
        options: [
          { label: i18n.t("male"), value: "male" },
          { label: i18n.t("fermale"), value: "female" },
        ],
        defaultValue: "male",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyaku_card_syubetsu",
        label: "contract_card_type",
        type: "select",
        options: [
          { label: i18n.t("male"), value: "male" },
          { label: i18n.t("fermale"), value: "female" },
        ],
        defaultValue: "male",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "jyutyu_jigyousyo_name",
        label: "business_location",
        type: "text",
        rules: [{ required: true, message: "please_enter_keyword" }],
        defaultValue: "本社",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyakusya_name",
        label: "prime_contructor",
        type: "text",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "jyutyu_eigyousyo",
        label: "ordering_office",
        type: "select",
        options: [
          { label: i18n.t("male"), value: "male" },
          { label: i18n.t("fermale"), value: "female" },
        ],
        defaultValue: "male",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyaku_teiketsu_date",
        label: "contract_signing_date",
        type: "range-date",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "syoukai_card_syutoku",
        label: "sales_representative",
        type: "sub-modal",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "agree",
        label: "agree_to_terms",
        type: "checkbox",
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "age",
        label: "age",
        type: "number",
        placeholder: "enter_age",
        md: 12,
        lg: 12,
        xl: 12,
      },
    ];

    const data: ItemListContract[] = [
      {
        id: 1,
        classification: "本体",
        contract_number: "未採番",
        status: "受注予定",
        project_name: "Dクラディア千種、中島 四郎様",
        contract_category: "その他",
        scheduled_contract_month: "その他",
        contractor: "中島1四郎",
        contract_amount_tax_yen: 0,
        approval_status: "未承認",
        date_of_conclusion: "契約締結",
        date_of_posting: "契約計上",
        date_of_completion: "契約計上",
        schedule: "予定",
        start_date: "2022/03/09",
        end_date: "2023/02/25",
        completed_date: "2022/03/09",
      },
      {
        id: 2,
        classification: "本体",
        contract_number: "未採番",
        status: "受注予定",
        project_name: "Dクラディア千種、中島 四郎様",
        contract_category: "その他",
        scheduled_contract_month: "その他",
        contractor: "中島1四郎",
        contract_amount_tax_yen: 0,
        approval_status: "未承認",
        date_of_conclusion: "契約締結",
        date_of_posting: "契約計上",
        date_of_completion: "契約計上",
        schedule: "予定",
        start_date: "2022/03/09",
        end_date: "2023/02/25",
        completed_date: "2022/03/09",
      },
      {
        id: 3,
        classification: "本体",
        contract_number: "未採番",
        status: "受注予定",
        project_name: "Dクラディア千種、中島 四郎様",
        contract_category: "その他",
        scheduled_contract_month: "その他",
        contractor: "中島1四郎",
        contract_amount_tax_yen: 0,
        approval_status: "未承認",
        date_of_conclusion: "契約締結",
        date_of_posting: "契約計上",
        date_of_completion: "契約計上",
        schedule: "予定",
        start_date: "2022/03/09",
        end_date: "2023/02/25",
        completed_date: "2022/03/09",
      },
      {
        id: 4,
        classification: "本体",
        contract_number: "未採番",
        status: "受注予定",
        project_name: "Dクラディア千種、中島 四郎様",
        contract_category: "その他",
        scheduled_contract_month: "その他",
        contractor: "中島1四郎",
        contract_amount_tax_yen: 0,
        approval_status: "未承認",
        date_of_conclusion: "契約締結",
        date_of_posting: "契約計上",
        date_of_completion: "契約計上",
        schedule: "予定",
        start_date: "2022/03/09",
        end_date: "2023/02/25",
        completed_date: "2022/03/09",
      },
    ];

    onMounted(async () => {});

    return {
      data,
      currentPage,
      pagePage,
      total,
      itemBreadcrumbs,
      expand,
      fieldsDisabled,
      searchFields,
      onChangePage,
      onChangePerPage,
      handleSearch,
      handleResetFilter,
    };
  },
};
</script>
<style scoped></style>
