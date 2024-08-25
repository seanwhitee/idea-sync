<script setup>
const props = defineProps({
  name: String,
  icon: String,
});
</script>
<template>
  <div class="flex items-center justify-start ps-4 py-1.5 rounded-lg">
    <Icon :name="props.icon" class="w-8 h-8 text-white me-4" />
    <p class="hidden text-lg font-light text-white md:hidden lg:flex">
      {{ props.name }}
    </p>
  </div>
</template>
