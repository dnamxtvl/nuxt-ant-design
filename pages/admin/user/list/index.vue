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
      },
      {
        title: "Other",
        children: [
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
            width: 200,
          },
          {
            title: "Address",
            children: [
              {
                title: "Street",
                dataIndex: "street",
                key: "street",
                width: 200,
              },
              {
                title: "Block",
                children: [
                  {
                    title: "Building",
                    dataIndex: "building",
                    key: "building",
                    width: 100,
                  },
                  {
                    title: "Door No.",
                    dataIndex: "number",
                    key: "number",
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Company",
        children: [
          {
            title: "Company Address",
            dataIndex: "companyAddress",
            key: "companyAddress",
            width: 200,
          },
          {
            title: "Company Name",
            dataIndex: "companyName",
            key: "companyName",
          },
        ],
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        width: 80,
        fixed: "right",
      },
    ];
    const data = [...Array(10)].map((_, i) => ({
      key: i,
      name: "John Brown",
      age: i + 1,
      street: "Lake Park",
      building: "C",
      number: 2035,
      companyAddress: "Lake Street 42",
      companyName: "SoftLake Co",
      gender: "M",
    }));

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
