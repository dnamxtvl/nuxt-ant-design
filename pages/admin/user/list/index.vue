<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen :titleScreen="title" />
    <!-- Content -->
    <!-- Filter -->
    <div class="content-box content-box-filter">
      <h1 class="title-filter">{{ $t("welcome") }}</h1>
      <a-form
        ref="formRef"
        name="advanced_search"
        class="ant-advanced-search-form"
        :model="formState"
        @finish="onFinish"
      >
        <a-row :gutter="24">
          <template v-for="i in 10" :key="i">
            <a-col v-show="expand || i <= 6" :span="8">
              <a-form-item
                :name="`field-${i}`"
                :label="`field-${i}`"
                :rules="[{ required: true, message: 'input something' }]"
              >
                <a-input
                  v-model:value="formState[`field-${i}`]"
                  placeholder="placeholder"
                ></a-input>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">Search</a-button>
            <a-button style="margin: 0 8px" @click="() => formRef.resetFields()"
              >Clear</a-button
            >
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined />
              </template>
              <template v-else>
                <DownOutlined />
              </template>
              Advanced
            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>
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
      <!-- pagination -->
      <Pagination
        :currentPageApp="currentPage"
        :totalItem="total"
        @onChange="onChangePage"
        :perPageSize="pagePage"
        @onChangeSize="onChangePerPage"
      />
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
import type { FormInstance } from "ant-design-vue";

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
  },
  setup() {
    const itemBreadcrumbs = ref([
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
    };
    const pagePage = ref<number>(10);
    const onChangePerPage = (perPage: number) => {
      currentPage.value = 1;
      console.log("perPage", perPage);
      console.log("currentPage", currentPage.value);
      pagePage.value = perPage;
    };

    const expand = ref(false);
    const formRef = ref<FormInstance>();
    const formState = reactive({});

    const onFinish = (values: any) => {
      console.log("Received values of form: ", values);
      console.log("formState: ", formState);
    };

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

    const handleResizeColumn = (w, col) => {
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
      formRef,
      formState,
      onFinish,
      onChangePage,
      onChangePerPage,
      handleResizeColumn,
    };
  },
});
</script>
<style scoped></style>
