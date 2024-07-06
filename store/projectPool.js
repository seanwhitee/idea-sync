import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectPoolStore = defineStore(
  "projectPool",
  () => {
    const projects = ref([]);

    const archives = ref([]);

    const selectedGroup = ref("member_recruiting")
    return {
      projects,
      archives,
      selectedGroup
    }
  }
)