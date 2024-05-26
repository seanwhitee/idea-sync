
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore(
  "searchbar",
  () => {
		const isOpen = ref(false);
    return {
      isOpen,
    }
		
  },
);
