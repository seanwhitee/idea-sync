import { defineStore } from "pinia";
import { ref } from "vue";

// store for create project
export const useProjectStore = defineStore(
  "project",
  () => {
		const hostId = ref(0);
		const title = ref("");
		const description = ref("");
		const statusId = ref(0);
		const isGraduationProject = ref(false);
		const school = ref("");
		const allowApplicantsNum = ref(1);
		const applicantCount = ref(0);
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
			applicantCount.value = 0;
			projectImages.value = [];
			tags.value = [];
			createAt.value = new Date();
			applicants.value = [];
		}

		const getRelatedProjects = async(projectId) => {
			await $fetch('http://localhost:8080/api/v1/project/getRelatedProjects', {
				method: 'GET',
				params: {
					projectId: projectId
				}
			}).then((res)=>{
				relatedProjects.value = res;
			})

			
		}

		/**
		 * @param {string} tag
		 */
		const addTag = (tag) => {
			// check if the tag already exists
			if (tags.value.includes(tag)) return;
			tags.value.push(tag);
		}

		const deleteTag = (tag) => {

			// search for tag name
			const index = tags.value.indexOf(tag);
			// if it exists, delete it
			if (index > -1) {
				tags.value.splice(index, 1);
			}
		}
    return { 
			addTag,
			deleteTag,
			reset,
			getRelatedProjects,
			requireSkills,
			hostId,
			title,
			description,
			statusId,
			isGraduationProject,
			school,
			allowApplicantsNum,
			applicantCount,
			projectImages,
			tags,
			createAt,
			applicants,
			relatedProjects
		};
  },
);
