import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectPoolStore = defineStore(
  "projectPool",
  () => {
    const projects = ref([]);
    const archiveProjects = ref([]);
    const selectedGroup = ref("member_recruiting")
    return {
      projects,
      archiveProjects,
      selectedGroup
    }
  }, {
    persist: {
      storage: sessionStorage,
      paths: ["projects", "archiveProjects", "selectedGroup"],
    },
  }
)