<template>
  <div class="content-box content-box-filter">
    <h1 class="title-filter" v-if="title">{{ $t(title) }}</h1>
    <a-form :model="formState" layout="vertical" @finish="handleSubmit" ref="formRef">
      <a-row :gutter="24">
        <template v-for="(field, index) in fields" :key="field.name">
          <a-col
            v-show="expand || index < numBasicFilter"
            v-bind="getResponsiveProps(field)"
          >
            <a-form-item
              :name="field.name"
              :label="field.label"
              :rules="field.rules || []"
            >
              <!-- Input text -->
              <a-input
                v-if="field.type === 'text'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder || ''"
              />

              <!-- Select dropdown -->
              <a-select
                v-else-if="field.type === 'select'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder || ''"
                :options="field.options || []"
              />

              <!-- Date picker -->
              <a-date-picker
                v-else-if="field.type === 'date'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder || ''"
              />

              <!-- Radio button -->
              <a-radio-group
                v-else-if="field.type === 'radio'"
                v-model:value="formState[field.name]"
              >
                <a-radio
                  v-for="option in field.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </a-radio>
              </a-radio-group>

              <!-- Checkbox -->
              <a-checkbox
                v-else-if="field.type === 'checkbox'"
                v-model:checked="formState[field.name]"
              >
                {{ field.label }}
              </a-checkbox>

              <!-- Number input -->
              <a-input-number
                v-else-if="field.type === 'number'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder || ''"
              />

              <!-- Range date picker -->
              <a-range-picker
                v-else-if="field.type === 'range-date'"
                v-model:value="formState[field.name]"
                :placeholder="[
                  field.placeholder || 'Start date',
                  field.placeholder || 'End date',
                ]"
              />
            </a-form-item>
          </a-col>
        </template>
      </a-row>

      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">Search</a-button>
          <a-button style="margin: 0 8px" @click="handleClear">Reset</a-button>
          <a
            v-if="fields.length > numBasicFilter"
            style="font-size: 12px"
            @click="expand = !expand"
          >
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            {{ expand ? "Collapse" : "Advanced" }}
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import type { ItemFormSearch } from "~/types/common/res";

export default defineComponent({
  name: "FormSearch",
  props: {
    fields: {
      type: Array<ItemFormSearch>,
      required: true,
    },
    numBasicFilter: {
      type: Number,
      default: 6,
    },
    title: {
      type: String,
      required: false,
    }
  },
  setup(props, { emit }) {
    const formState = ref<Record<string, any>>({});
    const formRef = ref();
    const expand = ref(false);

    const handleSubmit = () => {
        formRef.value
        .validate()
        .then(() => {
            console.log("formState", formState.value);
            emit("submit", formState.value);
        })
    };

    const handleClear = () => {
        formRef.value.resetFields();
        emit("handleClear", {});
    };

    const getResponsiveProps = (field: ItemFormSearch) => {
        return {
            xs: field.xs || 24,
            sm: field.sm || 12,
            md: field.md || 8,
            lg: field.lg || 6,
            xl: field.xl || 4,
        };
    };

    return {
      formState,
      formRef,
      expand,
      handleSubmit,
      handleClear,
      emit,
      getResponsiveProps
    };
  },
});
</script>
