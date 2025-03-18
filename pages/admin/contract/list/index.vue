<template>
  <div :id="elementId">
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
      :disabledFields="disabledFields"
      @submit="handleSearch"
      @handleClear="handleResetFilter"
    />
    <!-- End Filter -->
    <div class="content-box">
      <!-- Table -->
      <TableListContract
        title="search_result"
        :total="listContract?.pagination.records"
        :results="listContract?.data"
      />
      <!-- End Table -->
      <!-- pagination -->
      <Pagination
        :currentPage="page"
        :totalItem="listContract?.pagination.records"
        @onChange="onChangePage"
        :perPageSize="limit"
        @onChangeSize="onChangePerPage"
      />
      <!-- End Pagination -->
    </div>
    <!-- End Content -->
  </div>
</template>

<script lang="ts" setup>
import TitleScreen from "~/components/common/TitleScreen.vue";
import { ref } from "vue";
import Pagination from "~/components/common/Pagination.vue";
import Breadcrumb from "~/components/common/Breadcrumb.vue";
import type { ItemBreadcrumb, ItemFormSearch } from "~/types/common/res";
import FormSearch from "~/components/common/FormSearch.vue";
import { useI18n } from "vue-i18n";
import TableListContract from "~/components/contract/list/TableListContract.vue";
import { RULES_VALIDATION } from "~/constants/config/validation";
import type { ListContract } from "~/types/contract/res";
import type { SearchContract } from "~/types/contract/req";
import FullScreenLoader from "~/components/common/FullScreenLoader.vue";
import { useRoute as useRouteNuxt } from "nuxt/app";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "~/constants/config/application";
import api from "~/api";
import Helper from "~/utils/helper";

definePageMeta({
  layout: "admin-dashboard",
});

const elementId = ref<string>("list-contract");
const loading = useState<boolean>("globalLoading", () => false);
const i18n = useI18n();
const disabledFields = ref<string[]>(["jyutyu_jigyousyo_name", "eigyo_tantousya"]);
const listContract = ref<ListContract>();
const onSsr = ref<boolean>(true);

const page = ref<number>(Helper.getDefaultPage());
const limit = ref<number>(Helper.getDefaultPerPage());

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
        message: RULES_VALIDATION.CONTRACT_NUMBER.MAX_LENGTH + i18n.t("input_max_length"),
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
        message: RULES_VALIDATION.PROJECT_NAME.MAX_LENGTH + i18n.t("input_max_length"),
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

const searchParams = ref<SearchContract>(
  getDefaultParams(searchFields, disabledFields.value)
);

const getListContract = async () => {
  loading.value = true;
  const data = await api.contract.list({
    page: page.value,
    limit: limit.value,
    ...searchParams.value,
  }, onSsr.value);

  listContract.value = data as ListContract;
  loading.value = false;
};

await getListContract();

const onChangePerPage = (perPage: number) => {
  limit.value = perPage;
};

const onChangePage = async (pageNumber: number) => {
  page.value = pageNumber;
  onSsr.value = false;
  await getListContract();
  Helper.scrollToTop(elementId.value);
};

const handleSearch = async (formState: Record<string, any>) => {
  page.value = DEFAULT_PAGE;
  searchParams.value = formState;
  onSsr.value = false;
  await getListContract();
};

const handleResetFilter = async (formState: Record<string, any>) => {
  page.value = DEFAULT_PAGE;
  limit.value = DEFAULT_PER_PAGE;
  searchParams.value = formState;
  onSsr.value = false;
  await getListContract();
};
</script>
<style scoped></style>
