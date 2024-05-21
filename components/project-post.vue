<script setup>
import { ref } from "vue";

const props = defineProps({
  project: Object,
});
const hoverEffect = ref(false);

// fetch projects from api
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
          class="text-white text-2xl font-bold hover:bg-violet-500 ease-linear duration-200 cursor-pointer w-fit"
          :class="
            hoverEffect
              ? 'border-b-4 border-violet-500 ease-linear duration-200'
              : 'border-0 ease-linear duration-300'
          "
        >
          {{ props.project.title }}
        </p>
        <!--feature section contains school|allowApplicantsNum|applicantCount-->
        <div class="flex items-center gap-2 pt-3 text-sm">
          <p>
            {{ props.project.school }} <span class="opacity-50">｜</span>
          </p>
          <p>需求：{{ props.project.allowApplicantsNum }} <span class="opacity-50">｜</span> </p>
          <p>應徵：{{ props.project.applicantCount }}</p>
        </div>
        <p class="break-words py-1 pe-2 font-thin">
          {{ props.project.description }}
        </p>
      </div>

      <!--tags-->
      <div class="flex flex-wrap items-center gap-2 pe-2 py-1 w-10/12">
        <div
          v-if="props.project.graduationProject"
          class="flex h-fit text-start items-center justify-center bg-blue-800/50 border font-light border-blue-300 text-white px-2 rounded-lg gap-1"
        >
          畢業專題
        </div>
        <Tag v-for="tag in props.project.tags" :key="tag" :tagName="tag" />
      </div>
    </div>

    <div class="pt-4">
    <img
      :src="props.project.images[0]"
      :alt="props.project.images[0]"
      class="h-28 w-28"
    />
  </div>
  </div>
</template>
