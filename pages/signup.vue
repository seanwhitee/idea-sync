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
</script>
<template>
  <GradientFog />
  <div class="flex items-center font-bold ms-4 pt-3 mb-16">
    <NuxtLink to="/" external class="text-white"
      >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
    </NuxtLink>
  </div>
  <div class="flex flex-col text-white mx-auto w-10/12 p-10">
    <h1 class="font-light text-4xl mb-10">建立新帳號</h1>

    <!--select type input to determine if user status is creator or mentor-->
    <div class="flex content-evenly mb-10">
      <p class="content-center text-sm font-extrali.ght">身份：</p>
      <div class="dropdown dropdown-hover dropdown-right dropdown-end">
        <div tabindex="0" class="btn m-1 glass">{{ handleRoleButtonClick(role) }}</div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li @click="role='creator'"><a>提案/申請者</a></li>
          <li @click="role='mentor'"><a>指導者</a></li>
        </ul>
      
      </div>
    </div>

    <RegistrationForm :userRole="role" />
  </div>
</template>
