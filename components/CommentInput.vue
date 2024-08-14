<script setup>
import { ref } from "vue";
import { useComment } from "~/composable/useComment";

const props = defineProps({
  userId: Number,
  projectId: Number,
  addComment: Function,
});
const handleClick = async (userId, projectId, text) => {
  await props.addComment(userId, projectId, text);
  comment.value = "";
};
const { comment } = useComment();
const isInputFocused = ref(false);
</script>
<template>
  <div class="flex flex-col w-full mb-10">
    <input
      type="text"
      v-model="comment"
      placeholder="Add a comment..."
      @click="isInputFocused = true"
      class="bg-black border-b border-b-white/50 focus:border-b-white ease-linear duration-300 outline-none mb-2 font-extralight"
    />
    <div class="flex items-center justify-end gap-2" v-if="isInputFocused">
      <button
        class="bg-white hover:opacity-90 text-black rounded-full px-4 py-2 w-fit"
        @click="isInputFocused = false"
      >
        <p class="text-sm w-fit">取消</p>
      </button>
      <button
        class="bg-white hover:opacity-90 text-black rounded-full px-4 py-2 w-fit"
        :class="!comment ? 'bg-zinc-600' : ''"
        @click="handleClick(props.userId, props.projectId, comment)"
        :disabled="!comment"
      >
        <p class="text-sm w-fit">留言</p>
      </button>
    </div>
  </div>
</template>
