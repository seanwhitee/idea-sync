<script setup>
import LoginForm from "~/components/login-form.vue";
</script>
<template>
  <GradientFog />
  <div class="py-20 md:py-48 lg:py-36">
    <div
      class="flex flex-col items-start text-white mx-auto px-5 w-10/12 md:w-1/2 lg:w-1/2 max-w-lg bg-black md:bg-zinc-950 lg:bg-zinc-950 rounded-2xl py-5 md:py-20 lg:py-10"
    >
    <img
        src="/public/favicon.png"
        alt="favicon"
        class="translate-x-4 w-20 rounded-3xl mb-6 shadow-xl"
      />
      <div class="flex items-center w-full justify-start font-semibold text-lg md:text-2xl lg:text-2xl px-4 mb-8">
        <h1>登入</h1>
        <NuxtLink to="/" external class="text-white"
          >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
        </NuxtLink>
      </div>
      <div class="w-full p-4">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
