<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white"
  >
    <div class="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl">
      <!-- Logo -->
      <div class="text-center">
        <span class="flex mx-auto w-12"
          ><svg
            viewBox="0 0 128 128"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            fill="currentColor"
            width="50"
            height="50"
          >
            <title>Vue</title>
            <desc>Created with Sketch.</desc>
            <defs>
              <linearGradient
                x1="69.644116%"
                y1="0%"
                x2="69.644116%"
                y2="100%"
                id="linearGradient-1"
              >
                <stop stop-color="#29CDFF" offset="0%"></stop>
                <stop stop-color="#148EFF" offset="37.8600687%"></stop>
                <stop stop-color="#0A60FF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="-19.8191553%"
                y1="-36.7931464%"
                x2="138.57919%"
                y2="157.637507%"
                id="linearGradient-2"
              >
                <stop stop-color="#29CDFF" offset="0%"></stop>
                <stop stop-color="#0F78FF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="68.1279872%"
                y1="-35.6905737%"
                x2="30.4400914%"
                y2="114.942679%"
                id="linearGradient-3"
              >
                <stop stop-color="#FA8E7D" offset="0%"></stop>
                <stop stop-color="#F74A5C" offset="51.2635191%"></stop>
                <stop stop-color="#F51D2C" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g id="Vue" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Group" transform="translate(19.000000, 9.000000)">
                <path
                  d="M89.96,90.48 C78.58,93.48 68.33,83.36 67.62,82.48 L46.6604487,62.2292258 C45.5023849,61.1103236 44.8426845,59.5728835 44.8296987,57.9626396 L44.5035564,17.5209948 C44.4948861,16.4458744 44.0537714,15.4195095 43.2796864,14.6733517 L29.6459999,1.53153737 C28.055475,-0.00160504005 25.5232423,0.0449126588 23.9900999,1.63543756 C23.2715121,2.38092066 22.87,3.37600834 22.87,4.41143746 L22.87,64.3864751 C22.87,67.0807891 23.9572233,69.6611067 25.885409,71.5429748 L63.6004615,108.352061 C65.9466323,110.641873 69.6963584,110.624605 72.0213403,108.313281"
                  id="Path-Copy"
                  fill="url(#linearGradient-1)"
                  fill-rule="nonzero"
                  transform="translate(56.415000, 54.831157) scale(-1, 1) translate(-56.415000, -54.831157) "
                ></path>
                <path
                  d="M68,90.1163122 C56.62,93.1163122 45.46,83.36 44.75,82.48 L23.7904487,62.2292258 C22.6323849,61.1103236 21.9726845,59.5728835 21.9596987,57.9626396 L21.6335564,17.5209948 C21.6248861,16.4458744 21.1837714,15.4195095 20.4096864,14.6733517 L6.7759999,1.53153737 C5.185475,-0.00160504005 2.65324232,0.0449126588 1.12009991,1.63543756 C0.401512125,2.38092066 3.90211878e-13,3.37600834 3.90798505e-13,4.41143746 L3.94351218e-13,64.3864751 C3.94681177e-13,67.0807891 1.08722326,69.6611067 3.01540903,71.5429748 L40.7807092,108.401101 C43.1069304,110.671444 46.8180151,110.676525 49.1504445,108.412561"
                  id="Path"
                  fill="url(#linearGradient-2)"
                  fill-rule="nonzero"
                ></path>
                <path
                  d="M43.2983488,19.0991931 L27.5566079,3.88246244 C26.7624281,3.11476967 26.7409561,1.84862177 27.5086488,1.05444194 C27.8854826,0.664606611 28.4044438,0.444472651 28.9466386,0.444472651 L60.3925021,0.444472651 C61.4970716,0.444472651 62.3925021,1.33990315 62.3925021,2.44447265 C62.3925021,2.9858375 62.1730396,3.50407742 61.7842512,3.88079942 L46.0801285,19.0975301 C45.3051579,19.8484488 44.0742167,19.8491847 43.2983488,19.0991931 Z"
                  id="Path"
                  fill="url(#linearGradient-3)"
                ></path>
              </g>
            </g></svg
        ></span>
        <h2 class="mt-2 text-2xl font-semibold text-sky-500">Ant Design Pro</h2>
      </div>

      <!-- Tabs -->
      <div class="mt-2">
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          layout="vertical"
          autocomplete="off"
        >
          <a-form-item label="Email" name="email">
            <a-input
              v-model:value="formState.email"
              placeholder="Please enter your email"
            >
              <template #prefix>
                <UserOutlined class="text-gray-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="Password" name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="Please enter your password"
            >
              <template #prefix>
                <LockOutlined class="text-gray-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <div class="flex justify-between">
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
              <a class="text-blue-500">Forgot password?</a>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="onSubmit" class="w-full">Login</a-button>
          </a-form-item>
        </a-form>
      </div>

      <!-- Other Login Methods -->
      <div class="text-center mt-4">
        <p class="text-gray-500">Other login methods:</p>
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
import type { FormInputLogin } from "~/types/auth/input";
import type { Rule } from "ant-design-vue/es/form";
import { RULES_VALIDATION } from "~/constants/config/validation";

const formRef = ref();
const formState = ref<FormInputLogin>({
  email: "",
  password: "",
  remember: true,
});

const rules: Record<string, Rule[]> = {
  email: [
    { required: true, message: "Email is required!" },
    {
      min: RULES_VALIDATION.EMAIL_LENGTH.MIN,
      message: "Email must be at least 6 characters!",
    },
  ],
  password: [{ required: true, message: "Password is required!" }],
};

const onSubmit = () => {
  formRef.value.validate().then(() => {});
};
</script>
