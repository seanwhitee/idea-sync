<script setup>
const props = defineProps({
  avatarURL: String,
  username: String,
  email: String,
});
console.log(props.avatarURL);
</script>
<template>
  <div class="flex gap-2">
    <NuxtImg
      :src="props.avatarURL"
      alt="user-avatar"
      class="rounded-full border border-white w-8 h-8"
    />
    <div class="flex flex-col font-extralight text-xs">
      <p class="text-sm font-bold">{{ props.username }}</p>
      <p class="text-[10px]">{{ props.email }}</p>
    </div>
  </div>
</template>
