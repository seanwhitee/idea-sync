<script setup>
import { ref } from "vue";

const props = defineProps({
  project: Object,
});
const hoverEffect = ref(false);

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
  let projectTags = [...props.project.tags]
  if (projectTags.length > 5) {
    return projectTags.slice(0, 5);
  }
  return projectTags;
});
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
          {{ props.project.title }}
        </p>
        <!--feature section contains school|allowApplicantsNum|applicantCount-->
        <div class="flex items-center gap-2 pt-1 text-xs md:text-base">
          <p>
            {{ props.project.school }} <span class="opacity-50 z-0">｜</span>
          </p>
          <p>需求：{{ props.project.allowApplicantsNum }} <span class="opacity-50 z-0">｜</span> </p>
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
          class="flex h-fit text-start items-center justify-center shadow-blue-800/50 border font-light 
          border-blue-300 text-white px-2 rounded-lg gap-1 shadow-lg text-xs md:text-base"
        >
          畢業專題
        </div>
        <Tag v-for="tag in tags" :key="tag" :tagName="tag" />
      </div>
    </div>

    <div class="pt-4">
    <img
      :src="props.project.images[0]"
      :alt="props.project.images[0]"
      class="h-20 w-20 md:h-28 md:w-28"
    />
  </div>
  </div>
</template>
