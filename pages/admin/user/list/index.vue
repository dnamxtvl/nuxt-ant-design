<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen :titleScreen="title" />
    <!-- Content -->
    <!-- Filter -->
    <FormSearch
      title="Filter"
      :numBasicFilter="6"
      :fields="searchFields"
      @submit="handleSearch"
      @handleClear="handleResetFilter"
    />
    <!-- End Filter -->
    <div class="content-box">
      <!-- Table -->
      <h1 class="title-filter">Search Result</h1>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        @resizeColumn="handleResizeColumn"
        :scroll="{ x: true }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Name </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
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
    const itemBreadcrumbs = ref<ItemBreadcrumb[]>([
      {
        name: "Home",
        link: "/",
      },
      {
        name: "User",
        link: "/user",
      },
      {
        name: "List",
        link: "/user/list",
      },
    ]);
    const title = ref<string>("List User");
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
        label: "Name",
        type: "text",
        placeholder: "Enter name",
        md: 12,
        lg: 8,
        xl: 6,
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email",
        md: 12,
        lg: 8,
        xl: 6,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        placeholder: "Select gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
        md: 12,
        lg: 8,
        xl: 6,
      },
      {
        name: "joined",
        label: "Joined Date",
        type: "range-date",
        md: 12,
        lg: 8,
        xl: 6,
      },
      {
        name: "status",
        label: "Status",
        type: "radio",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
        md: 12,
        lg: 6,
        xl: 3,
      },
      {
        name: "birthdate",
        label: "Birthdate",
        type: "date",
        placeholder: "Select birthdate",
        md: 12,
        lg: 6,
        xl: 3,
      },
      {
        name: "keyword",
        label: "Keyword",
        type: "text",
        placeholder: "Enter keyword",
        rules: [{ required: true, message: "Please input keyword" }],
        md: 12,
        lg: 8,
        xl: 6,
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        placeholder: "Select category",
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
        label: "Date",
        type: "date",
        placeholder: "Select date",
        md: 12,
        lg: 6,
        xl: 3,
      },
      {
        name: "agree",
        label: "Agree to terms",
        type: "checkbox",
        md: 12,
        lg: 6,
        xl: 3,
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter age",
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
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 100,
        minWidth: 100,
        maxWidth: 200,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
      },
      {
        title: "Action",
        key: "action",
      },
    ]);

    const handleResizeColumn = (w: number, col: any) => {
      col.width = w;
    };

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
      handleResizeColumn,
      handleSearch,
      handleResetFilter,
    };
  },
});
</script>
<style scoped></style>
