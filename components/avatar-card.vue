<script setup>
const props = defineProps({
  avatarURL: String,
  username: String,
  email: String,
});
console.log(props.avatarURL)
</script>
<template>
  <div class="flex py-2 gap-2">
    <NuxtImg
      :src="props.avatarURL"
      alt="user-avatar"
      class="rounded-full border border-white"
    />
    <div class="flex flex-col font-extralight text-xs">
      <p>{{ props.username }}</p>
      <p>{{ props.email }}</p>
    </div>
  </div>
</template>
