<template>
  <div class="content-box content-box-filter">
    <h1 class="title-filter" v-if="title">{{ $t(title) }}</h1>
    <a-form
      :model="formState"
      layout="inline"
      @finish="handleSubmit"
      style="display: block"
      ref="formRef"
    >
      <a-row :gutter="24">
        <template v-for="(field, index) in fields" :key="field.name">
          <a-col
            v-show="expand || index < numBasicFilter"
            v-bind="getResponsiveProps(field)"
          >
            <a-form-item
              :name="field.name"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 16 }"
              :label="$t(field.label)"
              :rules="field.rules || []"
            >
              <!-- Input text -->
              <a-input
                v-if="field.type === 'text'"
                v-model:value="formState[field.name]"
                :placeholder="$t(field.placeholder ?? '') || ''"
                :disabled="fieldsDisabledState.includes(field.name)"
              />

              <!-- Select dropdown -->
              <a-select
                v-else-if="field.type === 'select'"
                v-model:value="formState[field.name]"
                :placeholder="$t(field.placeholder ?? '') || ''"
                :options="field.options || []"
                @change="() => changeSelect(field)"
                :disabled="fieldsDisabledState.includes(field.name)"
              />

              <!-- Date picker -->
              <a-date-picker
                v-else-if="field.type === 'date'"
                v-model:value="formState[field.name]"
                :placeholder="$t(field.placeholder ?? '') || ''"
                style="width: 100%"
                :disabled="fieldsDisabledState.includes(field.name)"
              />

              <!-- Radio button -->
              <a-radio-group
                v-else-if="field.type === 'radio'"
                v-model:value="formState[field.name]"
                :disabled="fieldsDisabledState.includes(field.name)"
              >
                <a-radio
                  v-for="option in field.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ $t(option.label) }}
                </a-radio>
              </a-radio-group>

              <!-- Checkbox -->
              <a-checkbox
                v-else-if="field.type === 'checkbox'"
                v-model:checked="formState[field.name]"
                :disabled="fieldsDisabledState.includes(field.name)"
              >
                {{ $t(field.label) }}
              </a-checkbox>

              <!-- Number input -->
              <a-input-number
                v-else-if="field.type === 'number'"
                v-model:value="formState[field.name]"
                style="width: 100%"
                :placeholder="$t(field.placeholder ?? '') || ''"
                :disabled="fieldsDisabledState.includes(field.name)"
              />

              <!-- Range date picker -->
              <a-range-picker
                v-else-if="field.type === 'range-date'"
                v-model:value="formState[field.name]"
                style="width: 100%"
                :placeholder="[
                  field.placeholder || $t('start_date'),
                  field.placeholder || $t('end_date'),
                ]"
                :disabled="fieldsDisabledState.includes(field.name)"
              />
            </a-form-item>
          </a-col>
        </template>
      </a-row>

      <a-row>
        <a-col :span="24" style="display: flex; justify-content: flex-end">
          <a-button type="primary" html-type="submit">{{ $t("search") }}</a-button>
          <a-button style="margin: 0 8px" @click="handleClear">{{
            $t("reset")
          }}</a-button>
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
            {{ expand ? $t("basic") : $t("advanced") }}
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
  components: {
    UpOutlined,
    DownOutlined,
  },
  props: {
    fields: {
      type: Array<ItemFormSearch>,
      required: true,
    },
    fieldsDisabledForm: {
      type: Array<String>,
      required: false,
      default: [],
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
    const fieldsDisabledState = ref<String[]>(props.fieldsDisabledForm);

    const handleSubmit = () => {
        formRef.value
        .validate()
        .then(() => {
            console.log("formState", formState.value);
            emit("submit", formState.value);
        })
    };

    const toggleDisabled = (fieldName: string) => {
      if (fieldsDisabledState.value.includes(fieldName)) {
        fieldsDisabledState.value = fieldsDisabledState.value.filter(f => f !== fieldName);
      } else {
        fieldsDisabledState.value.push(fieldName);
      }
    };

    const handleClear = () => {
        formRef.value.resetFields();
        toggleDisabled("email");
        emit("handleClear", {});
    };

    const changeSelect = (item: ItemFormSearch) => {
      console.log("item", item);
    }

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
      fieldsDisabledState,
      handleSubmit,
      handleClear,
      emit,
      getResponsiveProps,
      changeSelect,
    };
  },
});
</script>
