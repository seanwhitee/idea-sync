<script setup>
defineProps({
  name: String,
  icon: String,
});
</script>
<template>
  <div class="flex items-center justify-start ps-4 py-1.5 rounded-lg">
    <NuxtImg :src="icon" :alt="name" class="w-6 me-4"/>
		<p class=" text-white text-lg font-light">{{ name }}</p>
  </div>
</template>