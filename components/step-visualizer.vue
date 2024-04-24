<script setup>
import { ref } from "vue";
const props = defineProps({
  stepCount: Number,
  totalStep: Number,
});
</script>
<template>
	<p class="w-full md:w-1/2 lg:w-1/2 p-4 text-white flex items-center justify-start font-light opacity-50 text-lg mb-4">

		步驟： {{ props.stepCount }} / {{ props.totalStep }}
	</p>
</template>