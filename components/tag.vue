<script setup>
const props = defineProps({
  tagName: String,
  color: String,
});

const colorClasses = computed(() => {
  // Explicitly map color props to Tailwind classes
  switch (props.color) {
    case "violet":
      return "shadow-violet-500/50 border-violet-800";
    case "indigo":
      return "shadow-indigo-500/50 border-indigo-800";
    case "fuchsia":
      return "shadow-fuchsia-500/50 border-fuchsia-800";
    case "green":
      return "shadow-green-500/50 border-green-800";
    default:
      return ""; // Default case if no color matches
  }
});
</script>
<template>
  <div
    class="flex h-fit text-start items-center justify-start border font-light text-white px-2 rounded-md gap-1 shadow-md text-xs"
    :class="colorClasses"
  >
    <slot />
    {{ props.tagName }}
  </div>
</template>
