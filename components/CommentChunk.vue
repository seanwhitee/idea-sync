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
});
const replyShow = ref(false);
</script>
<template>
  <div class="flex items-start gap-2 w-full">
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
        :userId="props.userId"
        :projectId="props.projectId"
        :parentId="props.commentId"
      />
      <HideAndShowToggler
        class="mb-3"
        v-if="props.children.length > 0"
        @click="replyShow = !replyShow"
        :label="props.children.length + ' ' + 'replies'"
      />
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
