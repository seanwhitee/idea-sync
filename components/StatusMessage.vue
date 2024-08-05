<script setup>
import { ref } from 'vue';
const props = defineProps({
  message: String,
  type: String,
})
const textColor = ref('bg-red-800')
const bgColor = ref('text-red-200')
const defineMessageColor = () => {
  if (props.type === "warning") {
    textColor.value = "bg-yellow-800"
    bgColor.value = "text-yellow-200"
  } else if (props.type === "error") {
    textColor.value = "bg-red-800"
    bgColor.value = "text-red-200"
  } else {
    textColor.value = "bg-green-800"
    bgColor.value = "text-green-200"
  }
}
defineMessageColor()
</script>

<template>
  <div class="flex items-center justify-center w-full text-sm py-3 px-3"
    :class="`${textColor} ${bgColor}`"
  >
    {{ props.message }}
  </div>
</template>