import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useProjectPoolStore = defineStore("projectPool", () => {

  const authStore = useAuthStore();

  const projects = ref([]);
  const archives = ref([]);
  const selectedGroup = ref("member_recruiting");
  const projectIsLoading = ref(false);

  const getProjects = async (status) => {
    projectIsLoading.value = true;
    try {
      const response = await $fetch(
        `http://localhost:8080/api/v1/projectStatus/getRecommendProjectsByStatus?userId=${authStore.userInfo.id}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      projects.value = response;
    } catch (e) {
      projectIsLoading.value = false;
      console.error(e);
    } finally {
      projectIsLoading.value = false;
    }
  };
  return {
    projects,
    archives,
    selectedGroup,
    projectIsLoading,
    getProjects
  };
});
