<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  statusId: Number,
  title: String,
  school: String,
  allowApplicantsNum: Number,
  applicantCount: Number,
  tags: Array,
  imageURL: {
    type: String,
    required: false,
  },
  isGraduationProject: Boolean,
});
const hoverEffect = ref(false);

const title = computed(() => {
  let text = props.title;
  if (text.length > 20) {
    text = text.slice(0, 20) + "...";
    return text;
  }
  return text;
});

const tags = computed(() => {
  let projectTags = [...props.tags];
  if (projectTags.length > 2) {
    return projectTags.slice(0, 2);
  }
  return projectTags;
});
</script>
<template>
  <div
    v-if="props.statusId !== 3"
    class="flex w-full items-start justify-between cursor-pointer gap-1 px-2 py-3 bg-zinc-900"
    @mouseover="hoverEffect = true"
    @mouseleave="hoverEffect = false"
  >
    <div class="flex flex-col gap-1">
      <ProjectStatusVisualizer :statusId="props.statusId" class="mb-2" />
      <h3
        class="font-bold text-sm cursor-pointer hover:bg-violet-500 duration-200 ease-linear w-fit ms-2"
        :class="
          hoverEffect
            ? 'border-b-2 border-violet-500 ease-linear duration-200'
            : 'border-0 ease-linear duration-300'
        "
      >
        {{ title }}
      </h3>
      <div class="flex items-center text-xs opacity-80 mb-4 ms-2">
        <p>
          需求人數：{{ props.allowApplicantsNum }}
          <span class="opacity-50 z-0">｜</span>
        </p>
        <p>申請人數：{{ props.applicantCount }}</p>
      </div>

      <div class="flex flex-wrap gap-1 ms-2">
        <Tag :tagName="props.school" color="fuchsia" />
        <Tag
          v-if="props.isGraduationProject"
          tagName="畢業專題"
          color="indigo"
        />
        <Tag v-for="tag in tags" :key="tag" :tagName="tag" color="violet" />
      </div>
    </div>
    <NuxtImg
      v-if="props.imageURL"
      :src="props.imageURL"
      alt="project-image"
      class="w-14 h-14 rounded-md hidden lg:flex"
    />
  </div>
</template>
