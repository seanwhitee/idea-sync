<script setup>
import LoginForm from "~/components/login-form.vue";
</script>
<template>
  <GradientFog />
  <div class="flex items-center font-bold w-full p-4">
    <NuxtLink to="/" external class="text-white"
      >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
    </NuxtLink>
  </div>
  <div class="flex flex-col items-center text-white mx-auto p-10 w-full">
    <h1 class="font-light text-4xl mb-10">登入</h1>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
      <LoginForm />
    </div>
  </div>
</template>
