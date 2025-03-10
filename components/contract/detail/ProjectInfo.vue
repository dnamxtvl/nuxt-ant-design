<template>
  <div class="content-box-filter">
    <a-row justify="space-between">
      <h1 class="title-filter" v-if="title">
        {{ "<" + $t(title) + ">" }}
      </h1>
      <a-button type="primary">{{ $t("construction_site_selection") }}</a-button>
    </a-row>
    <a-form :model="formState" layout="horizontal">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="$t('furigana')" :labelCol="{ span: 3 }" required>
            <a-input v-model:value="formState.nameKana" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="$t('name')" :labelCol="{ span: 3 }" required>
            <a-input v-model:value="formState.name" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="6">
          <a-form-item label="" :labelCol="{ span: 3 }">
            <div class="zipcode-detail-input">
              <span class="zipcode-detail-label-space"></span>
              <span class="zipcode-detail-label">〒</span>
              <a-input v-model:value="formState.zipcode" />
            </div>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="$t('location_address')" :labelCol="{ span: 3 }" required>
            <a-input
              type="number"
              :placeholder="$t('postal_code')"
              v-model:value="formState.zipcode"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="12">
          <a-form-item :labelCol="{ span: 3 }">
            <div class="zipcode-detail-input">
              <span class="zipcode-detail-label-space"></span>
              <span class="zipcode-detail-label">{{ $t("street_address") }}</span>
              <a-input v-model:value="formState.address" />
            </div>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item :label="$t('apartment_name')">
            <a-input v-model:value="formState.buildingName" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="6">
          <a-form-item label="" :labelCol="{ span: 3 }">
            <div class="zipcode-detail-input">
              <span class="zipcode-detail-label-space"></span>
              <span class="zipcode-detail-label">〒</span>
              <a-input v-model:value="formState.zipcode2" />
            </div>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="$t('location_lot_number')" :labelCol="{ span: 3 }">
            <a-input v-model:value="formState.lotNumber" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :labelCol="{ span: 3 }">
            <div class="zipcode-detail-input">
              <span class="zipcode-detail-label-space"></span>
              <span class="zipcode-detail-label">{{ $t("street_address") }}</span>
              <a-input v-model:value="formState.address2" />
            </div>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item :label="$t('land_contract_number')" :labelCol="{ span: 10 }">
            <a-input v-model:value="formState.landContractNumber" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            :label="$t('zoning') + '1'"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.landUse1" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item
            :label="$t('zoning') + '2'"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.landUse2" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item
            :label="$t('zoning') + '3'"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.landUse3" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item
            :label="$t('building_coverage_ratio')"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.buildingCoverage" suffix="%" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label="$t('floor_area_ratio')"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.floorAreaRatio" suffix="%" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            :label="$t('land_price_per_tsubo')"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.landPrice" suffix="円" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <span class="text-primary">
          ※契約区分に「請負(セット)」を選択した場合のみ、土地契約番号の登録が可能です。</span
        >
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProjectInfo",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  setup() {
    const formState = ref({
      nameKana: "",
      name: "",
      zipcode: "",
      zipcode2: "",
      address: "",
      address2: "",
      buildingName: "",
      lotNumber: "",
      countryName: "",
      district: "",
      lot: "",
      landContractNumber: "",
      landUse1: "",
      landUse2: "",
      landUse3: "",
      buildingCoverage: "",
      floorAreaRatio: "",
      landPrice: "",
    });

    return {
      formState,
    };
  },
});
</script>
<style scoped lang="scss"></style>
