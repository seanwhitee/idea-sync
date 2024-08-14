<script setup>
const props = defineProps({
  name: String,
  icon: String,
});
</script>
<template>
  <div class="flex items-center justify-start ps-4 py-1.5 rounded-lg">
    <Icon :name="props.icon" class="w-8 h-8 me-4 text-white" />
    <p class="text-white text-lg font-light hidden md:hidden lg:flex">
      {{ props.name }}
    </p>
  </div>
</template>
