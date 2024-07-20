<script setup>
import { ref } from "vue";

const router = useRouter();
const props = defineProps({
  project: Object,
});

const hoverEffect = ref(false);

const description = computed(() => {
  let text = props.project.description;
  if (text.length > 40) {
    text = text.slice(0, 40) + "...";
    return text;
  }
  return text;
});

const getApplicantCount = computed(() => {
  return props.project.applicants.length;
});

const tags = computed(() => {
  let projectTags = [...props.project.tags];
  if (projectTags.length > 3) {
    return projectTags.slice(0, 3);
  }
  return projectTags;
});

const title = computed(() => {
  let text = props.project.title;
  if (text.length > 20) {
    text = text.slice(0, 20) + "...";
    return text;
  }
  return text;
});
</script>
<template>
  <div
    class="flex items-start justify-between px-4 py-4 w-full bg-zinc-900"
    @mouseover="hoverEffect = true"
    @mouseleave="hoverEffect = false"
  >
    <div class="flex flex-col justify-between h-full w-10/12">
      <div class="flex flex-col">
        <p
          @click="router.push(`/project/${props.project.id}`)"
          class="text-white text-base md:text-2xl font-bold hover:bg-violet-500 ease-linear duration-200 cursor-pointer w-fit"
          :class="
            hoverEffect
              ? 'border-b-4 border-violet-500 ease-linear duration-200'
              : 'border-0 ease-linear duration-300'
          "
        >
          {{ title }}
        </p>
        <!--feature section contains allowApplicantsNum|applicantCount-->
        <div class="flex items-center gap-2 pt-1 text-xs md:text-sm mb-3">
          <p>
            需求人數：{{ props.project.allowApplicantsNum }}
            <span class="opacity-50 z-0">｜</span>
          </p>
          <p>申請人數：{{ getApplicantCount }}</p>
        </div>
        <p class="break-words py-1 pe-3 font-thin text-xs md:text-base">
          {{ description }}
        </p>
      </div>

      <!--tags-->
      <div class="flex flex-wrap items-center gap-2 pe-3 py-1 w-full">
        <Tag :tagName="props.project.school" color="fuchsia" />
        <Tag
          v-if="props.project.graduationProject"
          tagName="畢業專題"
          color="indigo"
        />
        <Tag v-for="tag in tags" :key="tag" :tagName="tag" color="violet" />
      </div>
    </div>

    <div class="py-2 px-2 flex flex-col items-end">
      <NuxtImg
        :src="props.project.images[0]"
        :alt="props.project.images[0]"
        class="hidden md:flex h-20 w-20 md:h-28 md:w-28 mb-2"
      />
      <div class="">
        <ArchiveButton :project="props.project" />
      </div>
    </div>
  </div>
</template>
