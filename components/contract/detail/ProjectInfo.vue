<template>
  <a-card title="工事名称・物件名称">
    <a-form layout="inline">
      <!-- 名称カナ & 名称 -->
      <div class="grid grid-cols-2 gap-4">
        <a-form-item label="名称カナ" required>
          <a-input v-model:value="formData.kanaName" />
        </a-form-item>
        <a-form-item label="名称" required>
          <a-input v-model:value="formData.name" />
        </a-form-item>
      </div>

      <!-- 所在地 (住所) -->
      <a-form-item label="所在地（住所）" required>
        <div class="grid grid-cols-4 gap-4">
          <a-input placeholder="〒" v-model:value="formData.address.postalCode" />
          <a-input placeholder="番地" v-model:value="formData.address.streetNumber" />
          <a-input
            placeholder="ビル・マンション名"
            v-model:value="formData.address.buildingName"
          />
        </div>
      </a-form-item>

      <!-- 脱所在地 (地番) -->
      <a-form-item label="脱所在地（地番）" required>
        <div class="grid grid-cols-3 gap-4">
          <a-input placeholder="〒" v-model:value="formData.location.postalCode" />
          <a-input placeholder="番地" v-model:value="formData.location.streetNumber" />
        </div>
      </a-form-item>

      <!-- その他 thông tin -->
      <div class="grid grid-cols-2 gap-4">
        <a-form-item label="団地名称">
          <a-input v-model:value="formData.complexName" />
        </a-form-item>
        <a-form-item label="街区">
          <a-input v-model:value="formData.district" />
        </a-form-item>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <a-form-item label="号地">
          <a-input v-model:value="formData.lotNumber" />
        </a-form-item>
        <a-form-item label="土地契約番号">
          <a-input v-model:value="formData.landContractNumber" />
        </a-form-item>
      </div>

      <!-- 土地情報 -->
      <div class="grid grid-cols-4 gap-4">
        <a-form-item label="用途地域1">
          <a-select v-model:value="formData.zone1">
            <a-select-option value="residential">住宅地</a-select-option>
            <a-select-option value="commercial">商業地</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="用途地域2">
          <a-select v-model:value="formData.zone2">
            <a-select-option value="residential">住宅地</a-select-option>
            <a-select-option value="commercial">商業地</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="建蔽率（法定）">
          <a-input type="number" v-model:value="formData.buildingCoverage" suffix="%" />
        </a-form-item>
        <a-form-item label="容積率（法定）">
          <a-input type="number" v-model:value="formData.floorAreaRatio" suffix="%" />
        </a-form-item>
      </div>

      <!-- 土地坪単価 -->
      <a-form-item label="土地坪単価（実績価格）">
        <a-input v-model:value="formData.landPrice" suffix="円" />
      </a-form-item>

      <!-- Button -->
      <div class="text-right">
        <a-button type="primary">建設地選択</a-button>
      </div>
    </a-form>
  </a-card>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({
  kanaName: "",
  name: "",
  address: {
    postalCode: "",
    streetNumber: "",
    buildingName: "",
  },
  location: {
    postalCode: "",
    streetNumber: "",
  },
  complexName: "",
  district: "",
  lotNumber: "",
  landContractNumber: "",
  zone1: null,
  zone2: null,
  buildingCoverage: "",
  floorAreaRatio: "",
  landPrice: "",
});
</script>
