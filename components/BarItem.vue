<script setup>
const props = defineProps({
  name: String,
  icon: String,
});
</script>
<template>
  <div class="flex items-center justify-start ps-4 py-1.5 rounded-lg">
    <Icon :name="props.icon" class="w-6 h-6 me-4 text-white" />
    <p class="text-white text-lg font-light">{{ props.name }}</p>
  </div>
</template>
