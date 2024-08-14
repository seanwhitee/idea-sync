<script setup>
const props = defineProps({
  commentId: Number,
  avatarURL: String,
  comment: String,
  nickName: String,
  date: String,
  children: Array,
  userId: Number,
  projectId: Number,
  formatDate: Function,
  addReply: Function,
});
const replyShow = ref(false);
const isReplyInputFocus = ref(false);
</script>
<template>
  <div class="flex items-start gap-2 w-full mb-4">
    <NuxtImg
      :src="props.avatarURL"
      class="w-8 h-8 rounded-full border border-white"
    />
    <div class="flex flex-col w-full">
      <p class="flex gap-2 items-center">
        <span>{{ props.nickName }}</span>
        <span class="opacity-50 text-xs font-light">{{ props.date }}</span>
      </p>
      <p class="font-light text-sm">{{ props.comment }}</p>
      <ReplyInput
        v-if="isReplyInputFocus"
        v-model="isReplyInputFocus"
        :userId="props.userId"
        :projectId="props.projectId"
        :parentId="props.commentId"
        :addReply="props.addReply"
      />
      <div class="flex items-center -translate-x-4">
        <HideAndShowToggler
          v-if="props.children.length > 0"
          @click="replyShow = !replyShow"
          :label="props.children.length + ' ' + 'replies'"
        />
        <button @click="isReplyInputFocus = true"
          class="hover:bg-zinc-800 text-white text-sm rounded-full px-4 py-2 w-fit font-medium"
        >
          Reply
        </button>
      </div>
      <ChildComment
        v-if="replyShow"
        v-for="child in props.children"
        :key="child.id"
        :avatarURL="child.avatarURL"
        :comment="child.text"
        :nickName="child.nickName"
        :date="formatDate(child.createAt)"
        class="pb-2"
      />
    </div>
  </div>
</template>
