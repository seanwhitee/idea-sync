import { defineStore } from "pinia";
import { ref } from "vue";

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

		/**
		 * @param {string} tag
		 */
		const addTag = (tag) => {
			// check if the tag already exists
			if (tags.value.includes(tag)) return;
			tags.value.push(tag);
		}

		const deleteTag = (tag) => {
			tags.value.pop(tag);
		}
    return { 
			addTag,
			deleteTag,
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
		};
  },
);
