<script setup>
import { ref } from "vue";
import RoleSelector from "~/components/role-selector.vue";
const totalStep = 2;

const role = ref("creator");
const step = ref(1);
const passCode = ref(0);
const expiryTime = ref("");
const userInfo = ref({
  email: "",
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  nickName: "",
  profileDescription: "",
  avatarUrl: "",
  userRole: {
    id: 0,
    roleName: "",
  },
  roleVerified: false,
  emailVerified: false,
  allowProjectCreate: false,
  allowProjectApply: false,
});
const triggerGeneratePassCode = async (userName, email) => {
  // call API to generate passcode
  // request params = { username: string, email: string }
  const generatePassCodeEndPoint = "http://localhost:8080/api/v1/users/generatePassCode?username=" + userName + "&email=" + email;
  
  const response = await $fetch(generatePassCodeEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  passCode.value = response.passcode;
  expiryTime.value = response.expiryTime;


};
const updateUserInfo = (newUserInfo) => {
  userInfo.value = newUserInfo;
};
const handleRoleButtonClick = (role) => {
  if (role === "creator") {
    return "提案/申請者";
  } else if (role === "mentor") {
    return "指導者";
  }
};
const updateRole = (newRole) => {
  role.value = newRole;
};
const updateStep = (newStep) => {
  if (newStep >= totalStep) {
    step.value = totalStep;
  }else {
    step.value = newStep;
  }
};
</script>
<template>
  <GradientFog />
  <div class="flex items-center font-bold w-full p-4">
    <NuxtLink to="/" external class="text-white"
      >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
    </NuxtLink>
  </div>
  <div class="flex flex-col text-white mx-auto p-10 w-full">
    <h1 class="font-light text-4xl mb-10">建立新帳號</h1>
    <StepVisualizer :stepCount="step" :totalStep="totalStep" />
    <div v-if="step === 1" class="w-full md:w-1/2 lg:w-1/2 p-4">
      <RoleSelector
        :updateRole="updateRole"
        :handleRoleButtonClick="handleRoleButtonClick"
        :userRole="role"
      />

      <RegistrationForm
        :updateUserInfo="updateUserInfo"
        :updateStep="updateStep"
        :userRole="role"
        :triggerGeneratePassCode="triggerGeneratePassCode"
      />
    </div>
    <div v-if="step === 2" class="w-full md:w-1/2 lg:w-1/2 p-4">
      <PasscodeForm
        :updateStep="updateStep"
        :updateUserInfo="updateUserInfo"
        :expiryTime="expiryTime"
        :userInfo="userInfo"
        :stepCount="step"
        :correctPassCode="passCode"
      />
    </div>
  </div>
</template>
