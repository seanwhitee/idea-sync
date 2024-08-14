<script setup>
const props = defineProps({
  previewURL: String,
  fileName: String,
})
</script>
<template>
  <a target="_blank" :href="props.previewURL" alt="preview-container" class="w-full border
  border-gray-500/30 px-4 pb-6 pt-3 hover:bg-zinc-800/50 duration-300">
    <h3 class="font-semibold text-xl mb-3">{{ props.fileName }}</h3>
    <div class="w-full flex items-center justify-start">
      <Icon name="material-symbols:attachment" class="w-6 h-6" />
      <p class="text-sm text-gray-500 ml-2">預覽</p>
    </div>
  </a>
</template>