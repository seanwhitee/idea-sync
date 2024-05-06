<script setup>
import { useProjectStore } from '~/store/project';
const projectStore = useProjectStore();
const props = defineProps({
	tagName: String,
});
</script>
<template>
  <div
    class="flex bg-violet-800/50 border border-violet-500 text-white font-bold px-2 rounded-lg gap-1"
  >
    <button
    @click="projectStore.deleteTag(props.tagName)"
    class="flex items-center justify-center w-3">
      <NuxtImg src="delete.png" alt="tag-delete" class="w-full" />
    </button>
    {{ props.tagName}}
	</div>
</template>
