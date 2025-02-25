<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :itemBreads="itemBreadcrumbs" />
    <TitleScreen titleScreen="contract_detail" contractNumber="GCNT90013" />

    <!-- Content -->
    <!-- Main content -->
    <MainContent />
    <!-- End main content -->
    <div class="content-box">
      <!-- Tab -->
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="1" tab="工程計画">
          <!-- Contract partner -->
          <ContractPartner title="contracting_party" />
          <!-- End contract partner -->

          <!-- Contract Builder -->
          <ContractBuilder title="contract_builder" />
          <!-- End Contract Builder -->

          <!-- Site owner -->
          <SiteOwner title="site_owner" />
          <!-- End Site owner -->

          <!-- Project name/project property -->
          <!-- <ProjectInfo /> -->
          <!-- End Project name/project property -->

          <!-- Date of conclusion/recording -->
          <!-- End Date of conclusion/recording -->

          <!-- Resettlement support-->
          <!-- End resettlement support -->

          <!-- Business Entity -->
          <!-- End Business Entity -->

          <!-- Deemed Order -->
          <!-- End Deemed Order -->

          <!-- Construction Business Law -->
          <!-- End Construction Business Law -->
        </a-tab-pane>
        <a-tab-pane key="2" tab="契約基本情報"></a-tab-pane>
        <a-tab-pane key="3" tab="契約者補足情報"></a-tab-pane>
        <a-tab-pane key="4" tab="経理登録用"></a-tab-pane>
        <a-tab-pane key="5" tab="取消情報"></a-tab-pane>
        <a-tab-pane key="6" tab="ローン・公庫"></a-tab-pane>
        <a-tab-pane key="7" tab="回収条件"></a-tab-pane>
        <a-tab-pane key="8" tab="諸費用・特約事項"></a-tab-pane>
        <a-tab-pane key="9" tab="阻害要因"></a-tab-pane>
        <a-tab-pane key="10" tab="本体受注"></a-tab-pane>
      </a-tabs>
      <!-- End Tab -->
    </div>
    <!-- End Content -->
  </div>
</template>

<script lang="ts">
import TitleScreen from "~/components/common/TitleScreen.vue";
import { ref } from "vue";
import Breadcrumb from "~/components/common/Breadcrumb.vue";
import type { ItemBreadcrumb } from "~/types/common/res";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import MainContent from "~/components/contract/detail/MainContent.vue";
import ContractPartner from "~/components/contract/detail/ContractPartner.vue";
import ContractBuilder from "~/components/contract/detail/ContractBuilder.vue";
import SiteOwner from "~/components/contract/detail/SiteOwner.vue";
import ProjectInfo from "~/components/contract/detail/ProjectInfo.vue";

definePageMeta({
  layout: "admin-dashboard",
});

export default {
  components: {
    TitleScreen,
    Breadcrumb,
    MainContent,
    ContractPartner,
    ContractBuilder,
    SiteOwner,
    ProjectInfo,
  },
  setup() {
    const route = useRoute();
    const contractId = route.params.contractId as string;
    const activeTab = ref("1");
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
      {
        name: "contract_detail",
        link: "/contract/detail",
      },
    ]);

    const handleSearch = (formState: Record<string, any>) => {
      console.log("formState", formState.keyword);
    };

    const handleResetFilter = () => {
      console.log("handleResetFilter");
    };

    onMounted(async () => {});

    return {
      itemBreadcrumbs,
      activeTab,
      handleSearch,
      handleResetFilter,
    };
  },
};
</script>
<style scoped></style>
