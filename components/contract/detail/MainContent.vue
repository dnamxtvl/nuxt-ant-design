<template>
  <div class="content-box content-box-filter">
    <h1 class="title-filter" v-if="title">{{ $t(title) }}</h1>
    <a-form layout="horizontal">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-row :gutter="16" justify="space-between">
            <a-col :span="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="契約番号"
              >
                <a-input v-model:value="contractNumber" disabled />
              </a-form-item>
            </a-col>
            <a-col>
              <a-space>
                <a-row>
                  <a-button type="primary">コンプライアンス</a-button>
                  <a-button style="margin: 0 8px" type="primary">整合性チェック</a-button>
                  <a-button type="primary">承認</a-button>
                </a-row>
              </a-space>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="作成区分"
              >
                <a-input v-model:value="createType" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="契約区分"
                required
              >
                <client-only>
                  <a-select v-model:value="contractType" style="width: 100%">
                    <a-select-option value="請負">請負</a-select-option>
                    <a-select-option value="直売">直売</a-select-option>
                  </a-select>
                </client-only>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="取扱区分"
              >
                <a-input v-model:value="affiliation" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="受注営業所"
                required
              >
                <a-space style="width: 100%">
                  <a-input v-model:value="orderOffice" />
                  <a-button>...</a-button>
                </a-space>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="売上営業所"
                required
              >
                <a-space>
                  <a-input v-model:value="salesOffice" />
                  <a-button>...</a-button>
                </a-space>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="特約店名"
              >
                <a-input v-model:value="affiliation" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="営業担当者"
                required
              >
                <a-space style="width: 100%">
                  <a-input v-model:value="orderOffice" disabled />
                  <a-button>...</a-button>
                </a-space>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="所属拠点"
              >
                <a-input v-model:value="affiliation" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                label="設計担当者"
              >
                <a-space>
                  <a-input v-model:value="salesOffice" disabled />
                  <a-button>...</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <a-row justify="end">
        <a-space>
          <a-row>
            <a-button type="primary">契約書印刷</a-button>
            <a-button style="margin: 0 8px" type="primary">契約書(謄)印刷</a-button>
            <a-button type="primary">ご契約者カード</a-button>
          </a-row>
        </a-space>
      </a-row>

      <a-row class="text-primary" justify="end" style="margin-top: 0.5rem">
        <span>ダイワファミリークラブサービス案内書はこちらから印刷</span>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainContent",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  setup() {
    const contractNumber = ref("（未採番）");
    const createType = ref("新規");
    const orderOffice = ref("本社");
    const salesRep = ref("渡辺晴樹");
    const contractType = ref<string>("請負");
    const salesOffice = ref("本社");
    const affiliation = ref("");

    return {
      contractNumber,
      createType,
      orderOffice,
      salesRep,
      contractType,
      salesOffice,
      affiliation,
    };
  },
});
</script>

<style scoped lang="scss"></style>
