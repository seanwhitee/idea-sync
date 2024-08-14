<script setup>
import { useComment } from "~/composable/useComment";
import { useAuthStore } from "~/store/auth";

const props = defineProps({
  userId: Number,
  projectId: Number,
  parentId: Number,
  addReply: Function,
});
const handleClick = async (parentId, userId, projectId, text) => {
  await props.addReply(parentId, userId, projectId, text);
  comment.value = "";
};
const authStore = useAuthStore();
const isReplyInputFocus = defineModel();

const { comment } = useComment();
</script>
<template>
  <div class="flex items-start gap-2 w-full pt-5" v-if="isReplyInputFocus">
    <NuxtImg
      :src="authStore.userInfo.avatarUrl"
      alt="user-avatar"
      class="w-6 h-6 rounded-full border border-white"
    />
    <div class="flex flex-col w-full">
      <input
        type="text"
        v-model="comment"
        placeholder="Add a reply..."
        class="bg-black border-b border-b-white/50 outline-none mb-2 font-extralight text-sm focus:border-b-white ease-linear duration-300"
      />
      <div class="flex gap-2 items-center justify-end">
        <button
          class="bg-white hover:opacity-90 text-black rounded-full px-4 py-2 w-fit"
          @click="isReplyInputFocus = false"
        >
          <p class="text-sm w-fit">取消</p>
        </button>
        <button
          class="bg-white hover:opacity-90 text-black rounded-full px-4 py-2 w-fit"
          :class="!comment ? 'bg-zinc-600' : ''"
          @click="handleClick(props.parentId, props.userId, props.projectId, comment)"
          :disabled="!comment"
        >
          <p class="text-sm w-fit">回覆</p>
        </button>
      </div>
    </div>
  </div>
</template>
