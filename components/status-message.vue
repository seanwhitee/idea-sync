<script setup>
import { ref } from 'vue';
const props = defineProps({
  message: String,
  type: String,
})

const bgColor = ref('bg-red-400')
const defineMessageColor = () => {
  if (props.type === "warning") {
    
    bgColor.value = "bg-amber-400"
  } else if (props.type === "error") {
    
    bgColor.value = "bg-red-400"
  } else {
    
    bgColor.value = "bg-green-400"
  }
}
defineMessageColor()
</script>

<template>
  <div class="flex items-center justify-center w-full text-sm py-3 px-3 rounded-md text-black"
    :class="`${bgColor}`"
  >
    {{ props.message }}
  </div>
</template>