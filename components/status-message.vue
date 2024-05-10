<script setup>
const props = defineProps({
  message: String,
  textColor: String,
  color: String
})
</script>

<template>
  <div class="flex items-center justify-center w-full text-sm py-3 px-3"
    :class="props.color + ' ' + props.textColor"
  >
    {{ props.message }}
  </div>
</template>