<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const router = useRouter();
if (authStore.isLogin && authStore.userInfo.roleVerified) {
  router.push("/projects");
}
definePageMeta({
  colorMode: "dark",
});
const step = ref(1);
let userInfo = {
  username: "",
  password: "",
  nickName: "",
  profileDescription: "",
  roleId: 1,
  allowProjectApply: false,
  allowProjectCreate: false,
  roleVerified: false,
  email: "",
  avatarURL: "",
  firstName: "",
  lastName: "",
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
const getRoleName = (roleId) => {
  if (roleId === 1) {
    return "creator";
  } else if (roleId === 2) {
    return "mentor";
  } else if (roleId === 3) {
    return "admin";
  }
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
  <div
    class="flex items-center justify-center text-black dark:text-white mx-auto py-20 md:py-32 lg:py-32 rounded-xl w-full"
  >
    <div
      class="bg-white dark:bg-zinc-950 w-full md:w-1/2 lg:w-1/2 max-w-lg py-5 md:py-20 lg:py-10 px-10 rounded-2xl flex items-start justify-center flex-col"
    >
      <img
        src="/public/favicon.png"
        alt="favicon"
        class="translate-x-4 w-20 rounded-3xl mb-6 shadow-xl"
      />
      <h1
        class="flex px-4 justify-start w-full font-semibold text-lg md:text-2xl lg:text-2xl mb-8"
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
        <PasscodeForm
          v-else-if="step === 2"
          :userInfo="userInfo"
          :passCode="passCode"
          :generatePassCode="generatePassCode"
          :userRole="getRoleName(userInfo.roleId)"
        />
        <div
          class="w-full flex justify-start pe-2 mt-4 text-whit font-extralight text-xs"
        >
          有帳號嗎？<NuxtLink to="/signin" class="underline">登入</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
