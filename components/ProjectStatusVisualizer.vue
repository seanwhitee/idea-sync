<script setup>
const props = defineProps({
  statusId: Number,
});
</script>
<template>
  <div
    class="flex w-fit items-center justify-center border border-white/50 text-xs font-extralight gap-2 px-4 py-1 rounded-full"
  >
    <p :class="props.statusId === 1 ? 'font-bold border-b-white/70 border-b' : ''">成員招募</p>
    <span>></span>
    <p :class="props.statusId === 2 ? 'font-bold border-b-white/70 border-b' : ''">指導者招募</p>
    <span>></span>
    <p :class="props.statusId === 3 ? 'font-bold border-b-white/70 border-b' : ''">完成招募</p>
  </div>
</template>
