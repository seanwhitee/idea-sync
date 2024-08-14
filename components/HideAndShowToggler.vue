<script setup>
const props = defineProps({
  label: { type: String, required: false },
});
const clicked = ref(false);
const getIcon = computed(() => {
  if (!clicked.value) {
    return "ic:baseline-keyboard-arrow-down";
  }
  return "ic:baseline-keyboard-arrow-up";
});
</script>

<template>
  <div
    @click="clicked = !clicked"
    class="gap-4 hover:bg-blue-800/50 cursor-pointer w-fit flex items-center justify-center px-3 py-2 rounded-full text-blue-400 font-medium"
  >
    <Icon :name="getIcon" />
    <p>{{ props.label }}</p>
  </div>
</template>
