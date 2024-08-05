<script setup>
import { ref } from "vue";

const props = defineProps({
  userId: Number,
  projectId: Number,
});

const router = useRouter();
const comment = ref("");

const addComment = async () => {
  try {
    await $fetch(
      `http://localhost:8080/api/v1/comment/addComment?userId=${props.userId}&projectId=${props.projectId}&text=${comment.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      switch (res) {
        case "Comment added successfully":
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
  <div class="flex flex-col w-full">
    <input
      type="text"
      v-model="comment"
      placeholder="Add a comment..."
      class="bg-black border-b border-b-white/50 focus:border-b-white ease-linear focus:outline-none mb-2 font-extralight"
    />
    <div class="flex items-center justify-end">
      <button
        class="bg-white hover:opacity-90 text-black rounded-full px-4 py-2 w-fit"
        @click="addComment"
      >
        <p class="text-sm w-fit">留言</p>
      </button>
    </div>
  </div>
</template>
