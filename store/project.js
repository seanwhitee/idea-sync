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
			createAt
		};
  },
);
