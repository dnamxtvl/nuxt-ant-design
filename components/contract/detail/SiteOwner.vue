<template>
  <div class="content-box-filter">
    <a-row>
      <h1 class="title-filter title-contract-detail" v-if="title">
        {{ "<" + $t(title) + ">" }}
      </h1>
      <span class="text-primary">
        ※「主設定」ボタン:主の顧客として登録する
        「副設定」ボタン:副の顧客として登録する</span
      >
    </a-row>
    <a-form layout="horizontal">
      <!-- Row 4 -->
      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            :label="$t('furigana')"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input disabled />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Row 5 - Sub Partner Info -->
      <a-row :gutter="16" class="sub-partner-section">
        <a-col :xs="24" :md="8">
          <a-form-item
            :label="$t('land_owner_name')"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input disabled />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item label="TEL" :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
            <a-input disabled />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="4">
          <a-form-item
            :label="$t('age')"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input disabled />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="4" class="text-right">
          <a-button type="primary">{{ $t("main_setting") }}</a-button>
          <a-button type="primary">{{ $t("sub_setting") }}</a-button>
        </a-col>
      </a-row>
      <!-- Row 4 -->
      <a-row :gutter="16">
        <a-col :xs="24" :md="19">
          <a-form-item
            :label="$t('builder_current_address')"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
          >
            <a-input v-model:value="siteOwnerInfo.current_address" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :xs="24" :md="19">
          <a-form-item
            :label="$t('edited_by')"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
          >
            <a-input v-model:value="siteOwnerInfo.edited_by" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SiteOwner",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  setup() {
    const siteOwnerInfo = ref({
      furigana: "テスト ヘンシュウテストニー",
      tel: "",
      age: 43,
      land_owner_name: "DFCテスト 編集テスト02",
      contract_name: "DFCテスト 編集テスト02",
      address: "大阪府大阪市住吉区住吉2丁目0045",
      permit_number: "001F-0001",
      permit_number_edit: "",
      current_address: "大阪府大阪市住吉区住吉2丁目00456765",
      edited_by: "テスト ヘンシュウテストニー",
    });

    return {
      siteOwnerInfo,
    };
  },
});
</script>
<style scoped lang="scss"></style>
