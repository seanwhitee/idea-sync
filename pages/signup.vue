<script setup>
import { ref } from "vue";
const role = ref("creator");
</script>
<template>
  <GradientFog />
  <div class="flex items-center font-bold ms-4 mt-3 mb-16">
    
    <NuxtLink to="/" external class="text-white"
      >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
    </NuxtLink>
  </div>
  <div class="flex flex-col text-white mx-auto w-10/12 p-10">
		
    <h1 class="font-light text-4xl mb-10">建立新帳號</h1>

    <!--select type input to determine if user status is creator or mentor-->
    <label class="text-sm font-extralight">身份：</label>
    <div class="flex bg-black w-fit border border-white rounded-lg px-3 mb-5">
      <div class="flex items-center justify-center">
        <NuxtImg src="arrow-down.png" />
      </div>
      <select
        id="status"
        name="status"
        class="appearance-none bg-black  text-white py-4 px-3 rounded-lg leading-tight focus:outline-none focus:border-gray-500"
        @change="role = $event.target.value"
      >
        <option value="creator">提案/申請者</option>
        <option value="mentor">指導者</option>
      </select>
    </div>
    <RegistrationForm :userRole="role"/>
  </div>
</template>
