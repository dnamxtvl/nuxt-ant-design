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
                :label="$t('contract_number')"
              >
                <a-input v-model:value="contractNumber" disabled />
              </a-form-item>
            </a-col>
            <a-col>
              <a-space>
                <a-row>
                  <a-button type="primary">{{ $t("compliance") }}</a-button>
                  <a-button style="margin: 0 8px" type="primary">{{
                    $t("consistency_check")
                  }}</a-button>
                  <a-button type="primary">{{ $t("approval") }}</a-button>
                </a-row>
              </a-space>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                :label="$t('creation_category')"
              >
                <a-input v-model:value="createType" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                :label="$t('contract_category')"
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
                :label="$t('handling_classification')"
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
                :label="$t('ordering_office')"
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
                :label="$t('sales_office')"
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
                :label="$t('dealer_name')"
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
                :label="$t('sales_representative')"
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
                :label="$t('location')"
              >
                <a-input v-model:value="affiliation" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-form-item
                :labelCol="{ span: 10 }"
                :wrapperCol="{ span: 14 }"
                :label="$t('designer')"
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
            <a-button type="primary">{{ $t("contract_printing") }}</a-button>
            <a-button style="margin: 0 8px" type="primary">{{
              $t("contract_copy_printing")
            }}</a-button>
            <a-button type="primary">{{ $t("contractor_card") }}</a-button>
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
    const contractNumber = ref<string>("（未採番）");
    const createType = ref<string>("新規");
    const orderOffice = ref<string>("本社");
    const salesRep = ref<string>("渡辺晴樹");
    const contractType = ref<string>("請負");
    const salesOffice = ref<string>("本社");
    const affiliation = ref<string>("");

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
