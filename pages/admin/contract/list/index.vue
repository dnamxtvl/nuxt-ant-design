<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen titleScreen="list_user" contractNumber="GCNT90013" />
    <!-- Content -->
    <FullScreenLoader :loading="loading" />
    <!-- Filter -->
    <FormSearch
      title="filter"
      :numBasicFilter="12"
      :fields="searchFields"
      :fieldsDisabledForm="fieldsDisabled"
      ref="formSearchRef"
      @submit="handleSearch"
      @handleClear="handleResetFilter"
    />
    <!-- End Filter -->
    <div class="content-box">
      <!-- Table -->
      <TableMergeCell
        title="search_result"
        :total="listContract?.pagination.records"
        :results="listContract?.data"
      />
      <!-- End Table -->
      <!-- pagination -->
      <Pagination
        :currentPage="searchParams.page"
        :totalItem="listContract?.pagination.records"
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
import FullScreenLoader from "~/components/common/FullScreenLoader.vue";

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
    FullScreenLoader,
  },
  setup() {
    const loading = useState<boolean>("globalLoading", () => false);
    const i18n = useI18n();
    const fieldsDisabled = ref<string[]>(["jyutyu_jigyousyo_name", "eigyo_tantousya"]);
    const listContract = ref<ListContract>();
    const searchParams = ref<SearchContractReq>({
      page: 1,
      limit: 10,
    });

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
          { label: i18n.t("male"), value: "01" },
          { label: i18n.t("fermale"), value: "02" },
        ],
        defaultValue: "01",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyaku_card_syubetsu",
        label: "contract_card_type",
        type: "select",
        options: [
          { label: i18n.t("male"), value: "01" },
          { label: i18n.t("fermale"), value: "02" },
        ],
        defaultValue: "01",
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
          { label: i18n.t("male"), value: "01" },
          { label: i18n.t("fermale"), value: "02" },
        ],
        defaultValue: "01",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "keiyaku_teiketsu_date",
        label: "contract_signing_date",
        type: "range-date",
        formatDate: "YYYY/MM/DD",
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
        formatDate: "YYYY/MM/DD",
        md: 24,
        lg: 12,
        xl: 12,
      },
      {
        name: "syoukai_card_syutoku",
        label: "get_a_referral_card",
        type: "select",
        options: [
          { label: i18n.t("male"), value: "01" },
          { label: i18n.t("fermale"), value: "02" },
        ],
        md: 24,
        lg: 12,
        xl: 12,
      },
    ];

    const formSearchRef = ref();

    const onChangePerPage = (perPage: number) => {
      searchParams.value.limit = perPage;
    };

    const onChangePage = (pageNumber: number) => {
      searchParams.value.page = pageNumber;
      getListContract();
    };

    const handleSearch = async (formState: Record<string, any>) => {
      serializeRangeDate(["keiyaku_teiketsu_date", "keiyaku_keijyou_date"], formState);
      searchParams.value = {
        ...searchParams.value,
        ...formState,
        page: 1,
      };

      getListContract();
    };

    const handleResetFilter = (formState: Record<string, any>) => {
      searchParams.value = { ...searchParams.value, ...formState, page: 1, limit: 10 };
      getListContract();
    };

    const getListContract = async () => {
      loading.value = true;

      try {
        listContract.value = await customFetch(FETCH_API.CONTRACT.LIST, {
          method: "get",
          params: searchParams.value,
        });
      } catch (error) {}

      loading.value = false;
    };

    onMounted(async () => {
      if (formSearchRef.value) {
        console.log("formSearchRef", formSearchRef.value.formState);
        searchParams.value = { ...searchParams.value, ...formSearchRef.value.formState };
      }

      await getListContract();
    });

    return {
      listContract,
      searchParams,
      itemBreadcrumbs,
      fieldsDisabled,
      searchFields,
      onChangePage,
      onChangePerPage,
      handleSearch,
      handleResetFilter,
      formSearchRef,
      loading,
    };
  },
};
</script>
<style scoped></style>
