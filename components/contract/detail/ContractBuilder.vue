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
      <!-- Row 2 -->
      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            label="フリガナ"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="builderInfo.furigana" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item
            label="契約先名"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="builderInfo.contract_name" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="4">
          <a-form-item label="TEL" :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
            <a-input v-model:value="builderInfo.tel" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="4">
          <a-form-item label="年齢" :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
            <a-input-number
              v-model:value="builderInfo.age"
              :min="0"
              :max="150"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- Row 3 -->
      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            label="現在住所"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="builderInfo.address" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item label="編集" :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
            <a-space direction="vertical">
              <a-switch
                v-model:checked="builderInfo.checked1"
                checked-children="編集"
                un-checked-children="削除"
              />
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Row 4 -->
      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            label="フリガナ"
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
            label="契約先名"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-space style="width: 100%">
              <a-input disabled />
              <a-button>...</a-button>
            </a-space>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item label="TEL" :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
            <a-input disabled />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="4">
          <a-form-item label="年齢" :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
            <a-input disabled />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="4" class="text-right">
          <a-button type="primary">主設定</a-button>
          <a-button type="primary">副設定</a-button>
        </a-col>
      </a-row>
      <!-- Row 4 -->
      <a-row :gutter="16">
        <a-col :xs="24" :md="19">
          <a-form-item label="現住所" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
            <a-input v-model:value="builderInfo.current_address" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            label="許可番号"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="builderInfo.permit_number_edit" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <span class="text-primary"> ※契約先が建築業者のみ記入 </span>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :xs="24" :md="19">
          <a-form-item
            label="連名編集"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
          >
            <a-input v-model:value="builderInfo.edited_by" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ContractBuilder",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  setup() {
    const builderInfo = ref({
      furigana: "テスト ヘンシュウテストニー",
      tel: "",
      age: 43,
      checked1: true,
      contract_name: "DFCテスト 編集テスト02",
      address: "大阪府大阪市住吉区住吉2丁目0045",
      permit_number_edit: "",
      current_address: "大阪府大阪市住吉区住吉2丁目00456765",
      edited_by: "テスト ヘンシュウテストニー",
    });

    return {
      builderInfo,
    };
  },
});
</script>
<style scoped lang="scss"></style>
