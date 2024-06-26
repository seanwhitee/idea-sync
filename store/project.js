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
