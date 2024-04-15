<script setup>
import { ref } from "vue";
const role = ref("creator");
const options = [
  {
    value: 'mentor',
    label: 'mentor',
  },
  {
    value: 'creactor',
    label: 'creactor',
  }
]
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
    <div class="flex content-evenly">
    <p class="content-center text-sm font-extrali.ght">身份：</p>
      <el-select
        v-model="role"
        placeholder="Select"
        size="large"
        style="width: 240px"
      >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
      </el-select>
      </div>
    
    <RegistrationForm :userRole="role"/>
  </div>
</template>
