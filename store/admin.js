import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("admin", () => {
	const userList = ref([]);
  
  return { 
		userList,
	};
});
