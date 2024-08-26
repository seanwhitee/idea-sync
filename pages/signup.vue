<script setup>
import { ref } from "vue";
import GradientFog from "~/components/GradientFog.vue";
import PassCodeForm from "~/components/PassCodeForm.vue";
import RegistrationForm from "~/components/RegistrationForm.vue";
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const router = useRouter();
if (authStore.isLogin && authStore.userInfo.roleVerified) {
  router.push("/app-platform/projects");
}

const step = ref(1);
let userInfo = {
  username: "",
  password: "",
  nickName: "",
  profileDescription: "",
  allowProjectApply: false,
  allowProjectCreate: false,
  roleVerified: false,
  email: "",
  avatarURL: "",
  firstName: "",
  lastName: "",
  roleName: "",
};
const passCode = {
  code: 0,
  createAt: new Date().getTime(),
  expiryTime: new Date().getTime() + 5 * 60 * 1000,
};
const generatePassCode = async () => {
  passCode.code = Math.floor(100000 + Math.random() * 900000);
  passCode.createAt = new Date().getTime();
  passCode.expiryTime = passCode.createAt + 5 * 60 * 1000;
  // send passCode to user email
  const response = await $fetch(
    "http://localhost:8080/api/v1/users/sendEmail?email=" +
      userInfo.email +
      "&passCode=" +
      passCode.code,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const updateStep = (newStep) => {
  step.value = newStep;
};
const updateUserInfo = (newUserInfo) => {
  userInfo = newUserInfo;
};
</script>
<template>
  <GradientFog />
  <div class="py-20 text-black md:py-32 lg:py-32 dark:text-white">
    <div
      class="flex flex-col items-start w-10/12 max-w-lg px-0 py-5 mx-auto bg-white md:px-10 md:w-1/2 lg:w-1/2 dark:bg-zinc-950 rounded-2xl md:py-20 lg:py-10"
    >
      <img
        src="/public/favicon.png"
        alt="favicon"
        class="w-20 mb-6 translate-x-4 shadow-xl rounded-3xl"
      />
      <h1
        class="flex justify-start w-full px-4 mb-8 text-lg font-semibold md:text-2xl lg:text-2xl"
      >
        <span>創建你的</span>
        <NuxtLink to="/" external
          >Idea<span class="text-violet-500">Sync</span>
        </NuxtLink>
        <span>帳號</span>
      </h1>

      <div class="w-full p-4">
        <RegistrationForm
          v-if="step === 1"
          :updateStep="updateStep"
          :updateUserInfo="updateUserInfo"
          :generatePassCode="generatePassCode"
        />
        <PassCodeForm
          v-else-if="step === 2"
          :userInfo="userInfo"
          :passCode="passCode"
          :generatePassCode="generatePassCode"
          :userRole="userInfo.roleName"
        />
        <div
          class="flex justify-start w-full mt-4 text-xs pe-2 text-whit font-extralight"
        >
          有帳號嗎？<NuxtLink to="/signin" class="underline">登入</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
