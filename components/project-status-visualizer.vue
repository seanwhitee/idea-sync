<script setup>

const props = defineProps({
  statusId: Number,
});

</script>
<template>
  <div
    class="flex items-center justify-center border border-white/50 text-xs font-extralight
      gap-2 px-4 py-2 rounded-full"
  >
    <p :class="props.statusId === 1 ? 'font-bold' : ''">
      成員招募
    </p>
    <span>></span>
    <p :class="props.statusId === 2 ? 'font-bold' : ''">
      指導者招募
    </p>
    <span>></span>
    <p :class="props.statusId === 3 ? 'font-bold' : ''">
      完成招募
    </p>
  </div>
</template>
