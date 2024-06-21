import { defineStore } from "pinia";
import { ref } from "vue";

// store for create project
export const useCommentStore = defineStore(
  "conmment",
  () => {
		const comment = ref("");
    const commentChuncks = ref([]);

    const addComment = (comment) => {
      commentChuncks.value.push(comment);
    }

    return { 
			comment,
      commentChuncks,
      addComment
		};
  },
);
