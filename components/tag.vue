<script setup>
import { useProjectStore } from '~/store/project';
const projectStore = useProjectStore();
const props = defineProps({
	tagName: String,
});
const router = useRouter();
</script>
<template>
  <div
    class="flex h-fit text-start items-center justify-center shadow-violet-800/50 border font-light border-violet-500 
    text-white px-2 rounded-lg gap-1 shadow-lg text-sm"
  >
    <button
    v-if="router.currentRoute.value.path === '/create-project'"
    @click="projectStore.deleteTag(props.tagName)"
    class="flex items-center justify-center w-3">
      <NuxtImg src="delete.png" alt="tag-delete" class="w-full" />
    </button>
    {{ props.tagName}}
	</div>
</template>
