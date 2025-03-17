<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white"
  >
    <div class="w-full max-w-md bg-white p-8 shadow-lg">
      <!-- Logo -->
      <div class="text-center">
        <span class="app-logo app-logo-screen-login mx-auto">
          <img class="app-logo" :src="'/img/logo.jpg'" alt="logo" />
        </span>
      </div>
      <!-- Tabs -->
      <FullScreenLoader :loading="loading" />
      <div class="mt-2">
        <a-form ref="formRef" :model="formState" layout="vertical" autocomplete="off">
          <div
            v-if="errorMsgs.length > 0"
            class="mb-2"
            v-for="(error, index) in errorMsgs"
            :key="index"
          >
            <a-alert :message="error" type="error" show-icon />
          </div>
          <a-form-item :label="$t('email')" name="email">
            <a-input
              v-model:value="formState.email"
              :placeholder="$t('please_enter_email')"
            >
              <template #prefix>
                <UserOutlined class="text-gray-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item :label="$t('password')" name="password">
            <a-input-password
              v-model:value="formState.password"
              :placeholder="$t('please_enter_password')"
            >
              <template #prefix>
                <LockOutlined class="text-gray-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <div class="flex justify-between">
              <a-checkbox v-model:checked="formState.remember">{{
                $t("remember_me")
              }}</a-checkbox>
              <a class="text-blue-500">{{ $t("forgot_password") }}</a>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="onSubmit" class="w-full">{{
              $t("login")
            }}</a-button>
          </a-form-item>
        </a-form>
      </div>

      <!-- Other Login Methods -->
      <div class="text-center mt-4">
        <p class="text-gray-500">{{ $t("other_login") }}</p>
        <div class="flex justify-center gap-4 mt-2">
          <GoogleOutlined
            class="text-2xl bg-white cursor-pointer"
            style="color: cornflowerblue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons-vue";
import type { FormInputReq } from "~/types/auth/req";
import type { Rule } from "ant-design-vue/es/form";
import { RULES_VALIDATION } from "~/constants/config/validation";
import { FETCH_API } from "~/constants/config/api";
import type { ErrorResponse } from "~/types/common/res";
import type { LoginResponse } from "~/types/auth/res";
import helperApp from "~/utils/helper";
import { ROUTE_APP } from "~/constants/config/route";
import FullScreenLoader from "~/components/common/FullScreenLoader.vue";
import api from "~/api";

const loading = useState<boolean>("globalLoading", () => false);
const formRef = ref();
const formState = ref<FormInputReq>({
  email: "",
  password: "",
  remember: true,
});

const errorMsgs = ref<string[]>([]);

const rules: Record<string, Rule[]> = {
  email: [
    {
      required: true,
      message: "Email is required!",
      trigger: "change",
    },
    {
      min: RULES_VALIDATION.EMAIL_LENGTH.MIN,
      message:
        "Email must be at least " + RULES_VALIDATION.EMAIL_LENGTH.MIN + " characters!",
      trigger: "change",
    },
    {
      max: RULES_VALIDATION.EMAIL_LENGTH.MAX,
      message:
        "Email must be at most " + RULES_VALIDATION.EMAIL_LENGTH.MAX + " characters!",
      trigger: "change",
    },
    {
      validator(_, value) {
        if (!useValidator().isInvalidEmail(value)) {
          return Promise.reject(new Error("Email is invalid!"));
        }
        return Promise.resolve();
      },
    },
  ],
  password: [
    { required: true, message: "Password is required!" },
    {
      min: RULES_VALIDATION.PASSWORD_LENGTH.MIN,
      message:
        "Password must be at least " +
        RULES_VALIDATION.PASSWORD_LENGTH.MIN +
        " characters!",
      trigger: "change",
    },
    {
      max: RULES_VALIDATION.PASSWORD_LENGTH.MAX,
      message:
        "Password must be at most " +
        RULES_VALIDATION.PASSWORD_LENGTH.MAX +
        " characters!",
      trigger: "change",
    },
  ],
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true;
      const res: { data: LoginResponse } = await api.auth.login(formState.value);
      helperApp.setValueStoreLogin(res.data);

      return navigateTo(ROUTE_APP.CONTRACT.LIST);
    })
    .catch((error: ErrorResponse) => {
      console.log(error);
      loading.value = false;
    });
};

onMounted(() => {
  loading.value = false;
});
</script>
<style scoped lang="scss">
@use "~/assets/css/admin/login.scss";
</style>
