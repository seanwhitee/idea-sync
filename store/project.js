import { defineStore } from "pinia";
import { ref } from "vue";

// store for create project
export const useProjectStore = defineStore("project", () => {
  const hostId = ref(0);
  const title = ref("");
  const description = ref("");
  const statusId = ref(0);
  const isGraduationProject = ref(false);
  const school = ref("");
  const allowApplicantsNum = ref(1);
  const projectImages = ref([]);
  const tags = ref([]);
  const createAt = ref(new Date());
  const requireSkills = ref("");
  const applicants = ref([]);

  const relatedProjects = ref([]);

  const reset = () => {
    hostId.value = 0;
    title.value = "";
    description.value = "";
    statusId.value = 0;
    isGraduationProject.value = false;
    school.value = "";
    requireSkills.value = "";
    allowApplicantsNum.value = 1;
    projectImages.value = [];
    tags.value = [];
    createAt.value = new Date();
    applicants.value = [];
  };

  const getProjectByUserId = async (userId) => {
    const res = await $fetch(
      "http://localhost:8080/api/v1/project/getProjectsByUser",
      {
        method: "GET",
        params: {
          userId: userId,
        },
      }
    );
    return res;
  };

  const getProjectAppliedByUser = async (userId) => {
    const res = await $fetch(
      "http://localhost:8080/api/v1/applicant/getProjectAppliedByUser",
      {
        method: "GET",
        params: {
          userId: userId,
        },
      }
    );
    return res;
  };

  const getRelatedProjects = async (projectId) => {
    await $fetch("http://localhost:8080/api/v1/project/getRelatedProjects", {
      method: "GET",
      params: {
        projectId: projectId,
      },
    }).then((res) => {
      relatedProjects.value = res;
    });
  };

  const getProjectById = async (projectId) => {
    const res = await $fetch(
      "http://localhost:8080/api/v1/project/getProjectById",
      {
        method: "GET",
        params: {
          id: projectId,
        },
      }
    );

    return res;
  };

  const rejectApplicant = async (projectId, userId) => {
    const res = await $fetch(
      "http://localhost:8080/api/v1/applicant/rejectApplicant",
      {
        method: "POST",
        params: {
          projectId: projectId,
          userId: userId,
        },
      }
    );
    return res;
  };

  const acceptApplicant = async (projectId, userId) => {
    const res = await $fetch(
      "http://localhost:8080/api/v1/applicant/acceptApplicant",
      {
        method: "POST",
        params: {
          projectId: projectId,
          userId: userId,
        },
      }
    );
    return res;
  };

  const changeProjectStatus = async (projectId, statusId) => {
    const res = await $fetch(
      "http://localhost:8080/api/v1/project/changeProjectStatus",
      {
        method: "POST",
        params: {
          projectId: projectId,
          status: statusId,
        },
      }
    );
    return res;
  };

  /**
   * @param {string} tag
   */
  const addTag = (tag) => {
    // check if the tag already exists
    if (tags.value.includes(tag)) return;
    tags.value.push(tag);
  };

  const deleteTag = (tag) => {
    // search for tag name
    const index = tags.value.indexOf(tag);
    // if it exists, delete it
    if (index > -1) {
      tags.value.splice(index, 1);
    }
  };
  return {
    addTag,
    deleteTag,
    reset,
    changeProjectStatus,
    getRelatedProjects,
    getProjectByUserId,
    getProjectAppliedByUser,
    getProjectById,
    rejectApplicant,
    acceptApplicant,
    requireSkills,
    hostId,
    title,
    description,
    statusId,
    isGraduationProject,
    school,
    allowApplicantsNum,
    projectImages,
    tags,
    createAt,
    applicants,
    relatedProjects,
  };
});
