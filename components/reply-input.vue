<script setup>
import { ref } from "vue";
import { useAuthStore } from '~/store/auth';

const props = defineProps({
  userId: Number,
  projectId: Number,
  parentId: Number,
})

const authStore = useAuthStore();
const router = useRouter();

const comment = ref('');
const addReply = async () => {
  try {
    await $fetch(
    `http://localhost:8080/api/v1/comment/addReply?userId=${props.userId}&projectId=${props.projectId}&text=${comment.value}&parentId=${props.parentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      switch (res) {
        case "Reply added successfully":
          router.go();
          break;
        default:
          break;
      }
    });
  } catch (e) {
    console.error(e);
    return;
  }

};
</script>
<template>
  <div class="flex items-start gap-2 w-full pt-5">
    <NuxtImg 
      :src="authStore.userInfo.avatarUrl"
      alt="user-avatar"
      class="w-6 h-6 rounded-full border border-white"
    />
    <div class="flex flex-col w-full">
    <input type="text" v-model="comment" 
      placeholder="Add a reply..."
      class="bg-black border-b border-b-white/50 focus:outline-none mb-2 font-extralight text-sm focus:border-b-white"/>
    <div class="flex items-center justify-end">
      <button class="bg-white hover:opacity-90 text-black rounded-full px-8 py-2 w-fit" @click="addReply">
        <p class="text-sm w-fit">回覆</p>
      </button>
    </div>
  </div>
  </div>
</template>
