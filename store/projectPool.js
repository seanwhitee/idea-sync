import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectPoolStore = defineStore(
  "projectPool",
  () => {
    const projects = ref([]);

    /**
     * @type {Ref<number[]>}
     */
    const archiveProjectIds = ref([]);

    /**
     * @type {Ref<string>}
     */
    const selectedGroup = ref("member_recruiting")
    return {
      projects,
      archiveProjectIds,
      selectedGroup
    }
  }, {
    persist: {
      storage: sessionStorage,
      paths: ["projects", "archiveProjectIds", "selectedGroup"],
    },
  }
)