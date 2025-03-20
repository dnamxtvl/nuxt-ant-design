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
                :disabled="disabledFields.includes(field.name)"
              />

              <!-- Select dropdown -->
              <a-select
                v-else-if="field.type === 'select'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder ? $t(field.placeholder) : ''"
                :options="field.options || []"
                @change="() => changeSelect(field)"
                :disabled="disabledFields.includes(field.name)"
              />

              <!-- Sub Modal -->
              <a-space
                class="sub-modal-selected"
                v-else-if="field.type === 'sub-modal'"
                style="width: 100%"
              >
                <a-input :disabled="disabledFields.includes(field.name)" />
                <a-button :disabled="disabledFields.includes(field.name)">...</a-button>
              </a-space>

              <!-- Date picker -->
              <a-date-picker
                v-else-if="field.type === 'date'"
                v-model:value="formState[field.name]"
                :placeholder="field.placeholder ? $t(field.placeholder) : ''"
                style="width: 100%"
                :disabled="disabledFields.includes(field.name)"
              />

              <!-- Radio button -->
              <a-radio-group
                v-else-if="field.type === 'radio'"
                v-model:value="formState[field.name]"
                :disabled="disabledFields.includes(field.name)"
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
                :disabled="disabledFields.includes(field.name)"
              >
                {{ $t(field.label) }}
              </a-checkbox>

              <!-- Number input -->
              <a-input-number
                v-else-if="field.type === 'number'"
                v-model:value="formState[field.name]"
                style="width: 100%"
                :placeholder="$t(field.placeholder ?? '') || ''"
                :disabled="disabledFields.includes(field.name)"
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
                :disabled="disabledFields.includes(field.name)"
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
import { useRoute } from "nuxt/app";
import { cloneDeep } from "lodash";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "~/constants/config/application";

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
    disabledFields: {
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
    keepUrl: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const formState = ref<Record<string, any>>({});
    const resetFormState = ref<Record<string, any>>({});
    const defaultFormState = ref<Record<string, any>>({});
    const formRef = ref();
    const expand = ref<boolean>(false);
    const disabledFields = ref<String[]>(props.disabledFields);
    const rangeDateFields = ref<Array<string>>(props.fields.filter((field) => field.type === "range-date").map((field) => field.name));

    const handleSubmit = () => {
      formRef.value.validate().then(() => {
        const formStateSubmit = cloneDeep(formState.value);
        if (rangeDateFields.value.length) serializeRangeDate(rangeDateFields.value, formStateSubmit);

        const formStateEmit = Object.fromEntries(
          Object.entries(formStateSubmit).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
        );
        const queryParamUpdates = Object.fromEntries(Object.entries(formStateEmit).filter(([key]) => !disabledFields.value.includes(key)));

        updateUrl({ ...queryParamUpdates, page: DEFAULT_PAGE, limit: route.query.limit || DEFAULT_PER_PAGE }, props.keepUrl);
        emit("submit", formStateEmit);
      });
    };

    const handleClear = () => {
      formState.value = cloneDeep(resetFormState.value);
      formRef.value.resetFields();
      updateUrl({}, props.keepUrl);
      emit("handleClear", formState.value);
    };

    const setDefaultFormState = () => {
      props.fields.forEach((field) => {
        if (field.type === "select" && field.options?.length && field.defaultValue && !formState.value[field.name]) {
          formState.value[field.name] = field.defaultValue;
        }
        if (field.type === "text" && field.defaultValue) {
          formState.value[field.name] = field.defaultValue;
        }
      });

      resetFormState.value = cloneDeep(formState.value);
    };

    const fillFormStateFromUrl = () => {
      const params = route.query;

      Object.keys(params).forEach((key: string) => {
        const param = params[key] as string;
        if (param !== undefined && param != "" && param != null && !disabledFields.value.includes(key) && key !== "page" && key !== "limit") {
          const field = props.fields.find((field) => field.name === key);
          if (useValidator().isFieldValid(field, param)) {
            formState.value[key] = field?.type === "range-date" ? param.split(",") : param;
          }
        }
      });
    };

    onMounted(() => {
      setDefaultFormState();
      if (props.keepUrl) fillFormStateFromUrl();
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
      disabledFields,
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
