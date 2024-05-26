<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { useProjectPoolStore } from "~/store/projectPool";

const authStore = useAuthStore();
const projectPoolStore = useProjectPoolStore();
const toast = useToast();
const router = useRouter();
const props = defineProps({
  project: Object,
});

const hoverEffect = ref(false);
const isOpen = ref(false);

const addToArchive = async () => {
  try {
    const response = await $fetch(
      `http://localhost:8080/api/v1/archive/addArchive?projectId=${props.project.id}&userId=${authStore.userInfo.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    switch (response) {
      case "Archive added successfully":
        toast.add({
          title: "收納成功",
        });
        projectPoolStore.archiveProjects.push(props.project.id);
        break;

      default:
        break;
    }
  } catch (e) {
    console.error(e);
    return;
  }
};

/**
 * @description: if project description is greater than 50 characters, 
    then show the first 50 characters + ... 
 */
const description = computed(() => {
  let text = props.project.description;
  if (text.length > 40) {
    text = text.slice(0, 40) + "...";
    return text;
  }
  return text;
});

/**
 * @description: if tags of project is greater than 5, 
    then show the first 5 tags
 */
const tags = computed(() => {
  let projectTags = [...props.project.tags];
  if (projectTags.length > 5) {
    return projectTags.slice(0, 5);
  }
  return projectTags;
});

/**
 * @description: if title of project is greater than 20 characters, 
    then show the first 20 characters + ... 
 */
const title = computed(() => {
  let text = props.project.title;
  if (text.length > 20) {
    text = text.slice(0, 20) + "...";
    return text;
  }
  return text;
});

const deleteFromArchive = async () => {
  try {
    const response = await $fetch(
      `http://localhost:8080/api/v1/archive/deleteArchive?projectId=${props.project.id}&userId=${authStore.userInfo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    switch (response) {
      case "Archive deleted successfully":
        toast.add({
          title: "已移出收納",
        });
        projectPoolStore.archiveProjects =
          projectPoolStore.archiveProjects.filter(
            (id) => id !== props.project.id
          );
        break;
      default:
        break;
    }
  } catch (e) {
    console.error(e);
    return;
  }
};
</script>
<template>
  <div
    class="flex items-start justify-between px-4 py-4 w-full bg-zinc-900 cursor-pointer"
    @mouseover="hoverEffect = true"
    @mouseleave="hoverEffect = false"
  >
    <div class="flex flex-col justify-between h-full w-10/12">
      <div class="flex flex-col">
        <p
          class="text-white text-base md:text-2xl font-bold hover:bg-violet-500 ease-linear duration-200 cursor-pointer w-fit"
          :class="
            hoverEffect
              ? 'border-b-4 border-violet-500 ease-linear duration-200'
              : 'border-0 ease-linear duration-300'
          "
        >
          {{ title }}
        </p>
        <!--feature section contains school|allowApplicantsNum|applicantCount-->
        <div class="flex items-center gap-2 pt-1 text-xs md:text-base">
          <p>
            {{ props.project.school }} <span class="opacity-50 z-0">｜</span>
          </p>
          <p>
            需求：{{ props.project.allowApplicantsNum }}
            <span class="opacity-50 z-0">｜</span>
          </p>
          <p>應徵：{{ props.project.applicantCount }}</p>
        </div>
        <p class="break-words py-1 pe-3 font-thin text-xs md:text-base">
          {{ description }}
        </p>
      </div>

      <!--tags-->
      <div class="flex flex-wrap items-center gap-2 pe-3 py-1 w-full">
        <div
          v-if="props.project.graduationProject"
          class="flex h-fit text-start items-center justify-center shadow-blue-800/50 border font-light border-blue-300 text-white px-2 rounded-lg gap-1 shadow-lg text-xs md:text-base"
        >
          畢業專題
        </div>
        <Tag v-for="tag in tags" :key="tag" :tagName="tag" />
      </div>
    </div>

    <div class="py-2 px-2 flex flex-col items-end">
      <img
        :src="props.project.images[0]"
        :alt="props.project.images[0]"
        class="h-20 w-20 md:h-28 md:w-28 mb-2"
      />
      <div class="">
        <img 
          src="assets/images/filled-bookmark.png"
          alt="filled-bookmark"
          class="w-3"
          @click="deleteFromArchive"
          v-if="projectPoolStore.archiveProjects.includes(props.project.id)"
        />
        <img 
          src="assets/images/unfill-bookmark.png"
          alt="unfill-bookmark" 
          class="w-3"
          @click="addToArchive"
          v-if="!projectPoolStore.archiveProjects.includes(props.project.id)"/>
      </div>
    </div>
  </div>
</template>
