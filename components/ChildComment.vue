<script setup>
const props = defineProps({
  avatarURL: String,
  comment: String,
  nickName: String,
  date: String,
});
</script>
<template>
  <div class="flex items-start gap-2 w-full ps-2">
    <NuxtImg
      :src="props.avatarURL"
      class="w-6 h-6 rounded-full border border-white"
    />
    <div class="flex flex-col w-full">
      <p class="flex gap-2 items-center">
        <span class="text-sm">{{ props.nickName }}</span>
        <span class="opacity-50 text-xs font-light">{{ props.date }}</span>
      </p>
      <p class="text-xs font-light">{{ props.comment }}</p>
    </div>
  </div>
</template>
