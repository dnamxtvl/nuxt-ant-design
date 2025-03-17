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
                :placeholder="field.placeholder ? $t(field.placeholder) : ''"
                :disabled="fieldsDisabledState.includes(field.name)"
              />

              <!-- Select dropdown -->
              <a-select
                v-else-if="field.type === 'select'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder ? $t(field.placeholder) : ''"
                :options="field.options || []"
                @change="() => changeSelect(field)"
                :disabled="fieldsDisabledState.includes(field.name)"
              />

              <!-- Sub Modal -->
              <a-space
                class="sub-modal-selected"
                v-else-if="field.type === 'sub-modal'"
                style="width: 100%"
              >
                <a-input :disabled="fieldsDisabledState.includes(field.name)" />
                <a-button :disabled="fieldsDisabledState.includes(field.name)"
                  >...</a-button
                >
              </a-space>

              <!-- Date picker -->
              <a-date-picker
                v-else-if="field.type === 'date'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder ? $t(field.placeholder) : ''"
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
                :format="field.formatDate ?? 'YYYY/MM/DD'"
                :value-format="field.formatDate ?? 'YYYY/MM/DD'"
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
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import type { ItemFormSearch } from "~/types/common/res";
import { useRouter, useRoute } from "nuxt/app";
import { cloneDeep } from "lodash";

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
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const formState = ref<Record<string, any>>({});
    const resetFormState = ref<Record<string, any>>({});
    const defaultFormState = ref<Record<string, any>>({});
    const formRef = ref();
    const expand = ref<boolean>(false);
    const fieldsDisabledState = ref<String[]>(props.fieldsDisabledForm);
    const rangeDateFields = ref<Array<string>>(props.fields.filter((field) => field.type === "range-date").map((field) => field.name));
    const invalidParams = ref<string[]>([]);

    const handleSubmit = () => {
      formRef.value.validate().then(() => {
        const formStateSubmit = cloneDeep(formState.value);
        if (rangeDateFields.value.length) serializeRangeDate(rangeDateFields.value, formStateSubmit);

        const formStateEmit = Object.fromEntries(
          Object.entries(formStateSubmit).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
        );
        const queryParamUpdates = Object.fromEntries(Object.entries(formStateEmit).filter(([key]) => !fieldsDisabledState.value.includes(key)));

        updateUrl({ ...queryParamUpdates, page: 1, limit: route.query.limit || 10 });
        emit("submit", formStateEmit);
      });
    };

    const handleClear = () => {
      formState.value = cloneDeep(resetFormState.value);
      updateUrl({});
      emit("handleClear", formState.value);
    };

    const setDefaultFormState = () => {
      props.fields.forEach((field) => {
        if (field.type === "select" && field.options?.length && field.defaultValue && !formState.value[field.name]) {
          formState.value[field.name] = field.defaultValue || field.options[0].value;
        }
        if (field.type === "text" && field.defaultValue) {
          formState.value[field.name] = field.defaultValue;
        }
      });

      resetFormState.value = cloneDeep(formState.value);
    };

    const fillFormStateFromUrl = () => {
      const params = route.query;
      const validator = useValidator();
      const isFieldValid = (field: any, param: string) => {
        switch (field?.type) {
          case "select":
            return field?.options?.some((option: { label: string; value: string }) => option.value === param);
          case "text":
          case "number":
          case "sub-modal":
          case "checkbox":
          case "radio":
            return true;
          case "range-date":
            return validator.isValidRangeDate(param, field.formatDate ?? "YYYY/MM/DD");
          case "date":
            return validator.isValidDate(param, field.formatDate ?? "YYYY/MM/DD");
          default:
            return false;
        }
      };

      Object.keys(params).forEach((key: string) => {
        const param = params[key] as string;
        if (param !== undefined && param != "" && param != null && !fieldsDisabledState.value.includes(key) && key !== "page" && key !== "limit") {
          const field = props.fields.find((field) => field.name === key);
          if (isFieldValid(field, param)) {
            formState.value[key] = field?.type === "range-date" ? param.split(",") : param;
          } else {
            invalidParams.value.push(key);
          }
        } else if (key !== "page" && key !== "limit") {
          invalidParams.value.push(key);
        }
      });

      defaultFormState.value = cloneDeep(formState.value);
      defaultFormState.value = Object.fromEntries(
        Object.entries(defaultFormState.value).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
      );
      if (rangeDateFields.value.length > 0) serializeRangeDate(rangeDateFields.value, defaultFormState.value);
    };

    const removeInvalidParams = () => {
      if (invalidParams.value.length > 0) {
        const queryParams = { ...route.query };
        const uniqueInvalidParams = [...new Set(invalidParams.value)];

        uniqueInvalidParams.forEach((key) => {
          delete queryParams[key];
        });

        router.replace({
          path: route.path,
          query: { ...queryParams }
        });
      }
    };

    const updateUrl = (query: Record<string, any>) => {
      router.push({
        path: route.path,
        query: query,
      });
    };

    onMounted(() => {
      setDefaultFormState();
      fillFormStateFromUrl();
      removeInvalidParams();
    });

    const changeSelect = (item: ItemFormSearch) => {

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
      defaultFormState,
      handleSubmit,
      handleClear,
      emit,
      getResponsiveProps,
      changeSelect,
    };
  },
});
</script>
