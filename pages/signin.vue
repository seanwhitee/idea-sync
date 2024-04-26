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
  <div class="flex flex-col items-center text-white mx-auto px-5 w-1/2 mt-24 bg-zinc-950 rounded-xl py-20">
    <h1 class="font-light text-4xl">登入</h1>
    <div class="w-full md:w-full lg:w-1/2 p-4">
      <LoginForm />
    </div>
  </div>
</template>
