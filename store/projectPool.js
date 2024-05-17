import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectPoolStore = defineStore(
  "projectPool",
  () => {
    const projects = ref([]);
    const selectedGroup = ref("member_recruiting")
    return {
      projects,
      selectedGroup
    }
  }
)