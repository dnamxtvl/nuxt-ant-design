<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen titleScreen="list_user" />
    <!-- Content -->
    <!-- Filter -->
    <FormSearch
      title="filter"
      :numBasicFilter="6"
      :fields="searchFields"
      @submit="handleSearch"
      @handleClear="handleResetFilter"
    />
    <!-- End Filter -->
    <div class="content-box">
      <!-- Table -->
      <TableResult :columns="columns" :results="data" title="search_result" />
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
import type { TableColumnsType } from "ant-design-vue";
import TitleScreen from "~/components/common/TitleScreen.vue";
import { ref } from "vue";
import Pagination from "~/components/common/Pagination.vue";
import Breadcrumb from "~/components/common/Breadcrumb.vue";
import type { ItemBreadcrumb, ItemFormSearch } from "~/types/common/res";
import FormSearch from "~/components/common/FormSearch.vue";
import { useI18n } from "vue-i18n";
import TableResult from "~/components/common/TableResult.vue";

type TableDataType = {
  key: number;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
};

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

    const searchFields: ItemFormSearch[] = [
      {
        name: "name",
        label: "name",
        type: "text",
        placeholder: "enter_name",
        md: 12,
        lg: 8,
        xl: 6,
      },
      {
        name: "email",
        label: "email",
        type: "text",
        placeholder: "enter_email",
        md: 12,
        lg: 8,
        xl: 6,
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
        lg: 8,
        xl: 6,
      },
      {
        name: "joined",
        label: "joined_date",
        type: "range-date",
        md: 12,
        lg: 8,
        xl: 6,
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
        lg: 9,
        xl: 6,
      },
      {
        name: "birthdate",
        label: "birthdate",
        type: "date",
        placeholder: "select_birthdate",
        md: 12,
        lg: 9,
        xl: 6,
      },
      {
        name: "keyword",
        label: "keyword",
        type: "text",
        placeholder: "enter_keyword",
        rules: [{ required: true, message: "please_enter_keyword" }],
        md: 12,
        lg: 8,
        xl: 6,
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
        lg: 8,
        xl: 6,
      },
      {
        name: "date",
        label: "date",
        type: "date",
        placeholder: "select_date",
        md: 12,
        lg: 6,
        xl: 3,
      },
      {
        name: "agree",
        label: "agree_to_terms",
        type: "checkbox",
        md: 12,
        lg: 6,
        xl: 3,
      },
      {
        name: "age",
        label: "age",
        type: "number",
        placeholder: "enter_age",
        md: 12,
        lg: 9,
        xl: 6,
      },
    ];

    const columns: TableColumnsType = [
      {
        title: "分類",
        dataIndex: "category",
        key: "category",
        width: 80,
        customCell: (record, index) => {
          console.log("record", record);
          console.log("index", index);
          if (index === 0) {
            return { rowSpan: 2 };
          }
        },
      },
      {
        title: "契約番号",
        children: [
          {
            title: "ステータス",
            dataIndex: "status",
            key: "status",
            width: 100,
          },
        ],
      },
      {
        title: "契約/工事名称",
        children: [
          {
            title: "契約者",
            dataIndex: "contractor",
            key: "contractor",
            width: 200,
            children: [
              {
                title: "契約日",
                dataIndex: "contractDate",
                key: "contractDate",
                width: 200,
              },
            ],
          },
          {
            title: "税込契約金額(円)",
            dataIndex: "amount",
            key: "amount",
            width: 150,
            children: [
              {
                title: "契約金額ステータス",
                dataIndex: "amountStatus",
                key: "amountStatus",
                width: 150,
              },
            ],
          },
          {
            title: "承認状況",
            dataIndex: "approvalStatus",
            key: "approvalStatus",
            width: 200,
          },
        ],
      },
      {
        title: "締結日",
        dataIndex: "conclusionDate",
        key: "conclusionDate",
        width: 100,
      },
      {
        title: "予定",
        dataIndex: "plannedDate",
        key: "plannedDate",
        width: 50,
      },
      {
        title: "実績",
        dataIndex: "actualDate",
        key: "actualDate",
        width: 50,
      },
    ];

    const data = [
      {
        key: "1",
        category: "本体",
        status: "未採番",
        contractDate: "-",
        contractor: "Dクラディア千種_中島 四郎様",
        amount: "0",
        amountStatus: "未設定",
        approvalStatus: "未承認",
        conclusionDate: "契約締結",
        plannedDate: "2022/03/09",
        actualDate: "",
      },
      {
        key: "2",
        category: "受注予定",
        status: "-",
        contractDate: "-",
        contractor: "その他",
        amount: "0",
        amountStatus: "未設定",
        approvalStatus: "未承認",
        conclusionDate: "受注予定上",
        plannedDate: "2023/02/25",
        actualDate: "",
      },
      {
        key: "3",
        category: "本体",
        status: "採番済み",
        contractDate: "2022/01/01",
        contractor: "Dクラディア千種_中島 五郎様",
        amount: "1000000",
        amountStatus: "設定済み",
        approvalStatus: "承認済み",
        conclusionDate: "契約締結",
        plannedDate: "2022/04/01",
        actualDate: "2022/04/01",
      },
      {
        key: "4",
        category: "追加",
        status: "未採番",
        contractDate: "-",
        contractor: "Dクラディア千種_中島 六郎様",
        amount: "500000",
        amountStatus: "未設定",
        approvalStatus: "未承認",
        conclusionDate: "契約締結",
        plannedDate: "2022/05/01",
        actualDate: "",
      },
      {
        key: "5",
        category: "変更",
        status: "採番済み",
        contractDate: "2022/02/01",
        contractor: "Dクラディア千種_中島 七郎様",
        amount: "2000000",
        amountStatus: "設定済み",
        approvalStatus: "承認済み",
        conclusionDate: "契約締結",
        plannedDate: "2022/06/01",
        actualDate: "2022/06/01",
      },
    ];

    onMounted(async () => {});

    return {
      data,
      columns,
      currentPage,
      pagePage,
      total,
      itemBreadcrumbs,
      expand,
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
