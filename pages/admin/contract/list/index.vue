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
      <TableMergeCell title="search_result" :total="100" :results="listContract?.data" />
      <!-- End Table -->
      <!-- pagination -->
      <Pagination
        :currentPageApp="searchParams.page"
        :totalItem="total"
        @onChange="onChangePage"
        :perPageSize="searchParams.limit"
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
import { RULES_VALIDATION } from "~/constants/config/validation";
import type { ListContract } from "~/types/contract/res";
import { FETCH_API } from "~/constants/config/api";
import type { SearchContractReq } from "~/types/contract/req";

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
        link: "/contract/list",
      },
    ]);
    const fieldsDisabled = ref<string[]>(["jyutyu_jigyousyo_name", "eigyo_tantousya"]);
    const listContract = ref<ListContract>();
    const total = ref<number>(500);
    const searchParams = ref<SearchContractReq>({
      page: 1,
      limit: 10,
    });

    const onChangePerPage = (perPage: number) => {
      searchParams.value.limit = perPage;
    };

    const onChangePage = (pageNumber: number) => {
      searchParams.value.page = pageNumber;
    };

    const handleSearch = (formState: Record<string, any>) => {
      console.log("formState", formState.keyword);
    };

    const handleResetFilter = () => {
      console.log("handleResetFilter");
    };

    const getListContract = async () => {
      try {
        listContract.value = await customFetch(FETCH_API.CONTRACT.LIST, {
          method: "get",
          params: searchParams.value,
        });
      } catch (error) {}
    };

    const searchFields: ItemFormSearch[] = [
      {
        name: "keiyaku_no",
        label: "contract_number",
        type: "text",
        rules: [
          {
            max: RULES_VALIDATION.CONTRACT_NUMBER.MAX_LENGTH,
            message:
              RULES_VALIDATION.CONTRACT_NUMBER.MAX_LENGTH + i18n.t("input_max_length"),
          },
        ],
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "kouji_name",
        label: "project_name",
        type: "text",
        rules: [
          {
            max: RULES_VALIDATION.PROJECT_NAME.MAX_LENGTH,
            message:
              RULES_VALIDATION.PROJECT_NAME.MAX_LENGTH + i18n.t("input_max_length"),
          },
        ],
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
        defaultValue: "本社",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyakusya_name",
        label: "prime_contructor",
        type: "text",
        rules: [
          {
            max: RULES_VALIDATION.PRIME_CONTRUCTOR.MAX_LENGTH,
            message:
              RULES_VALIDATION.PRIME_CONTRUCTOR.MAX_LENGTH + i18n.t("input_max_length"),
          },
        ],
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
        name: "eigyo_tantousya",
        label: "sales_representative",
        type: "sub-modal",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyaku_keijyou_date",
        label: "scheduled_contract_recording_date",
        type: "range-date",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "syoukai_card_syutoku",
        label: "get_a_referral_card",
        type: "select",
        options: [
          { label: i18n.t("male"), value: "male" },
          { label: i18n.t("fermale"), value: "female" },
        ],
        md: 24,
        lg: 12,
        xl: 12,
      },
    ];

    onMounted(async () => {
      await getListContract();
    });

    return {
      listContract,
      searchParams,
      total,
      itemBreadcrumbs,
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
