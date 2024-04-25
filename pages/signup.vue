<script setup>
import { ref } from "vue";

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
  <div class="flex items-center font-bold w-full p-4">
    <NuxtLink to="/" external class="text-white"
      >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
    </NuxtLink>
  </div>
  <div class="flex flex-col items-center md:items-center lg:items-start text-white mx-auto mt-20 p-10 w-full">
    <h1 class="font-light text-4xl mb-10">建立新帳號</h1>

    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
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
</template>
