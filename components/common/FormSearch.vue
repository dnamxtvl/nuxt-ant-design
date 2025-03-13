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
import { defineExpose } from "vue";
import { useRoute } from "vue-router";

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
    const route = useRoute();
    const formState = ref<Record<string, any>>({});
    const defaultFormState = ref<Record<string, any>>({});
    const formRef = ref();
    const expand = ref<boolean>(false);
    const fieldsDisabledState = ref<String[]>(props.fieldsDisabledForm);

    const handleSubmit = () => {
      formRef.value
      .validate()
      .then(() => {
        emit("submit", formState.value);
      })
    };

    const handleClear = () => {
      formState.value = { ...defaultFormState.value };
      emit("handleClear", {});
    };

    const fillFormStateFromUrl = () => {
      const params = route.query;
      Object.keys(params).forEach((key) => {
        let param = params[key] as string;
        if (param !== undefined && !props.fieldsDisabledForm.includes(key)) {
          let field = props.fields.find((field) => field.name === key);
          if (field?.type === "select" && field?.options?.some(option => option.value === param)) {
            formState.value[key] = param;
          } else if (field?.type === "text" || field?.type === "number" || field?.type === "date" || field?.type === "sub-modal" ||
            field?.type === "checkbox" || field?.type === "radio") {
            formState.value[key] = param;
          } else if (field?.type === "range-date") {
            formState.value[key] = param.split(",");
          }
        }
      });
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
    };

    defineExpose({ formState });

    onBeforeMount(() => {
      setDefaultFormState();
      fillFormStateFromUrl();
      defaultFormState.value = { ...formState.value };
    });

    onMounted(() => {

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
      handleSubmit,
      handleClear,
      emit,
      getResponsiveProps,
      changeSelect,
    };
  },
});
</script>
