import { defineStore } from "pinia";
import { ref } from "vue";

// store for create project
export const useCommentStore = defineStore(
  "conmment",
  () => {
    const commentChuncks = ref([]);

    return { 
      commentChuncks,
		};
  },
);
