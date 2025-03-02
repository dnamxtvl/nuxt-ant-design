<template>
  <div class="content-box-filter">
    <a-row justify="space-between">
      <h1 class="title-filter" v-if="title">
        {{ "<" + $t(title) + ">" }}
      </h1>
      <a-button type="primary">建設地選択</a-button>
    </a-row>
    <a-form :model="formState" layout="horizontal">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="名称ガナ" :labelCol="{ span: 3 }" required>
            <a-input v-model:value="formState.nameKana" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="名称" :labelCol="{ span: 3 }" required>
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
          <a-form-item label="所在地（住所）" :labelCol="{ span: 3 }" required>
            <a-input
              type="number"
              placeholder="〒 郵便番号"
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
              <span class="zipcode-detail-label">番地</span>
              <a-input v-model:value="formState.address" />
            </div>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item label="ビル・マンション名">
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
          <a-form-item label="所在地（地番）" :labelCol="{ span: 3 }">
            <a-input v-model:value="formState.lotNumber" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :labelCol="{ span: 3 }">
            <div class="zipcode-detail-input">
              <span class="zipcode-detail-label-space"></span>
              <span class="zipcode-detail-label">番地</span>
              <a-input v-model:value="formState.address2" />
            </div>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item label="土地契約番号" :labelCol="{ span: 10 }">
            <a-input v-model:value="formState.landContractNumber" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-item
            label="用途地域1"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.landUse1" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item
            label="用途地域2"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.landUse2" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-item
            label="用途地域3"
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
            label="建蔽率(法定) "
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.buildingCoverage" suffix="%" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="容積率(法定)"
            :labelCol="{ span: 10 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model:value="formState.floorAreaRatio" suffix="%" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="土地坪単価(実績価格)"
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
