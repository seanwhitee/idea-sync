<script setup>
const props = defineProps({
  error: Object,
});
</script>

<template>
  <div class="w-full py-52 flex flex-col items-center justify-center">
    <h1 class="py-10 px-20 text-8xl">{{ error.statusCode }}</h1>
		<p class="mb-10">{{ error.statusMessage }}</p>
    <NuxtLink to="/" class="px-14 py-5 bg-zinc-950/50 border border-zinc-900 rounded-xl">Go back home</NuxtLink>
  </div>
</template>
