<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen titleScreen="list_user" contractNumber="GCNT90013" />
    <!-- Content -->
    <!-- Filter -->
    <FormSearch
      title="filter"
      :numBasicFilter="6"
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
import TableMergeCell from "~/components/contract/TableMergeCell.vue";
import type { ItemListContract } from "~/types/contract/res";

definePageMeta({
  layout: "admin-dashboard",
});

export default defineComponent({
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
        name: "user",
        link: "/user",
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

    const fieldsDisabled = ref<string[]>(["email", "joined"]);
    const searchFields: ItemFormSearch[] = [
      {
        name: "name",
        label: "name",
        type: "text",
        placeholder: "enter_name",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "email",
        label: "email",
        type: "text",
        placeholder: "enter_email",
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "gender",
        label: "gender",
        type: "select",
        placeholder: "select_gender",
        options: [
          { label: i18n.t("male"), value: "male" },
          { label: i18n.t("fermale"), value: "female" },
        ],
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "joined",
        label: "joined_date",
        type: "range-date",
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "status",
        label: "status",
        type: "radio",
        options: [
          { label: "active", value: "active" },
          { label: "inactive", value: "inactive" },
        ],
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "birthdate",
        label: "birthdate",
        type: "date",
        placeholder: "select_birthdate",
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "keyword",
        label: "keyword",
        type: "text",
        placeholder: "enter_keyword",
        rules: [{ required: true, message: "please_enter_keyword" }],
        md: 12,
        lg: 12,
        xl: 12,
      },
      {
        name: "category",
        label: "category",
        type: "select",
        placeholder: "select_category",
        options: [
          { label: "Category 1", value: "1" },
          { label: "Category 2", value: "2" },
        ],
        md: 12,
        lg: 12,
        xl: 12,
        specialFieldHandle: "category",
      },
      {
        name: "date",
        label: "date",
        type: "date",
        placeholder: "select_date",
        md: 12,
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
});
</script>
<style scoped></style>
