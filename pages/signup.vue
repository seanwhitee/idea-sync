<script setup>
import { ref } from "vue";

const role = ref("creator");

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

    <div class="w-full md:w-1/2 lg:w-1/2 p-4">
      <RoleSelector
        :updateRole="updateRole"
        :handleRoleButtonClick="handleRoleButtonClick"
        :userRole="role"
      />

      <RegistrationForm :userRole="role" />
    </div>
  </div>
</template>
