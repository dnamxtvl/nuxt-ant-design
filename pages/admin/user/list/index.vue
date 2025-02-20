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
        title: "name",
        dataIndex: "name",
        key: "name",
        width: 80,
        fixed: "right",
        align: "center",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 200,
        fixed: "right",
        align: "center",
        children: [
          {
            title: "Age Child",
            dataIndex: "agechild",
            key: "agechild",
            width: 200,
            fixed: "right",
            align: "center",
          },
        ],
      },
      {
        title: "Address",
        children: [
          {
            title: "Street",
            dataIndex: "street",
            key: "street",
            width: 200,
            fixed: "right",
            align: "center",
            children: [
              {
                title: "Street Child",
                dataIndex: "streetchild",
                key: "streetchild",
                width: 200,
                fixed: "right",
                align: "center",
              },
            ],
          },
          {
            title: "Block",
            children: [
              {
                title: "Building",
                dataIndex: "building",
                key: "building",
                width: 100,
                fixed: "right",
                align: "center",
              },
            ],
            fixed: "right",
            align: "center",
          },
          {
            title: "Etx",
            dataIndex: "etx",
            key: "etx",
            width: 200,
            fixed: "right",
            align: "center",
          },
        ],
      },
      {
        title: "gender1",
        dataIndex: "gender1",
        key: "gender1",
        width: 80,
        fixed: "right",
        align: "center",
      },
      {
        title: "gender",
        dataIndex: "gender",
        key: "gender",
        width: 80,
        fixed: "right",
        align: "center",
      },
    ];

    const data = [
      {
        key: "1",
        name: "本体",
        age: {
          agechild: "未採番",
        },
        address: {
          street: {
            streetchild: "Dクラディア千種_中島 四郎様",
          },
          block: {
            building: "契約締結",
          },
          etx: "2022/03/09",
        },
        gender1: "契約計上",
        gender: "2023/02/25",
      },
      {
        key: "2",
        name: "本体",
        age: {
          agechild: "受注予定",
        },
        address: {
          street: {
            streetchild: "その他 中島 四郎",
          },
          block: {
            building: "-",
          },
          etx: "2023/02/25",
        },
        gender1: "契約計上",
        gender: "2023/02/25",
      },
      {
        key: "3",
        name: "本体",
        age: {
          agechild: "未採番",
        },
        address: {
          street: {
            streetchild: "Dクラディア千種_中島 四郎様",
          },
          block: {
            building: "契約締結",
          },
          etx: "2022/08/18",
        },
        gender1: "契約計上",
        gender: "2022/08/18",
      },
      {
        key: "4",
        name: "本体",
        age: {
          agechild: "未採番",
        },
        address: {
          street: {
            streetchild: "麻呂 明香",
          },
          block: {
            building: "契約締結",
          },
          etx: "2022/08/10",
        },
        gender1: "契約計上",
        gender: "2022/08/10",
      },
      {
        key: "5",
        name: "本体",
        age: {
          agechild: "未採番",
        },
        address: {
          street: {
            streetchild: "契約基本情報工事名称確認",
          },
          block: {
            building: "契約締結",
          },
          etx: "2015/03/11",
        },
        gender1: "契約計上",
        gender: "-",
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
