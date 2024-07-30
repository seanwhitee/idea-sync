<script setup>
const props = defineProps({
  title: String,
});
const chooseBorderColor = computed(() => {
  switch (props.title) {
    case "member recruiting":
      return "border-violet-500/50";
    case "mentor recruiting":
      return "border-fuchsia-500/50";
    default:
      return "border-green-500/50";
  }
});
</script>
<template>
  <div
    class="flex flex-col border border-white/50 bg-black w-full pt-6 pb-3 px-3 gap-3"
  >
    <div class="flex items-center justify-start font-bold ps-3 gap-3 mb-4">
      <!--circle-->
      <div
        class="rounded-full border-2 bg-zinc-500/10 w-5 h-5"
        :class="chooseBorderColor"
      ></div>
      <h3>{{ props.title }}</h3>
    </div>
    <div class="flex flex-col gap-2 h-[400px] overflow-scroll">
      <slot />
    </div>
  </div>
</template>
