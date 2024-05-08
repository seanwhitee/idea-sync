<script setup>
const props = defineProps({
  message: String,
  color: String
})
</script>

<template>
  <div class="flex items-center justify-center w-full font-bold py-3 px-3"
    :class="props.color"
  >
    {{ props.message }}
  </div>
</template>