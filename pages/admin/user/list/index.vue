<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen :titleScreen="title" />
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
      <h1 class="title-filter">{{ $t("search_result") }}</h1>
      <a-table
        :columns="columns"
        :data-source="data"
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
                :color="
                  tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
                "
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
    const title = ref<string>("list_user");
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

    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 30,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 10,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 15,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 29,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
    ];

    const columns = ref<TableColumnsType>([
      {
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        responsive: ["md"],
      },
      {
        title: "age",
        dataIndex: "age",
        key: "age",
        width: 100,
        minWidth: 100,
        maxWidth: 200,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "tags",
        key: "tags",
        dataIndex: "tags",
      },
      {
        title: "action",
        key: "action",
      },
    ]);

    onMounted(async () => {});

    return {
      title,
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
