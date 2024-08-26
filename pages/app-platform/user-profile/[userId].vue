<script setup>
import { useProfileStore } from "~/composable/useProfileStore";
import { useAuthStore } from "~/store/auth";
import { useProjectStore } from "~/store/project";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const router = useRouter();
const route = useRoute();
const { userAcceptCount, userCommentCount, userDetail } = useProfileStore(
  route.params.userId
);
const personalProjects = ref([]);

onMounted(async () => {
  personalProjects.value = await projectStore.getProjectByUserId(
    route.params.userId
  );
});
</script>
<template>
  <div class="w-full px-4 py-3 mx-auto md:w-11/12">
    <h3 class="mb-4 text-3xl font-bold text-white">個人檔案</h3>
    <div class="flex flex-col gap-4 md:flex-row">
      <UContainer
        class="flex flex-col w-full px-4 py-6 text-white rounded-md bg-zinc-900 md:w-1/2"
        ><span class="text-5xl font-bold">{{ userCommentCount }}</span
        ><span class="text-zinc-500">總留言數</span>
      </UContainer>
      <UContainer
        class="flex flex-col w-full px-4 py-6 text-white rounded-md bg-zinc-900 md:w-1/2"
        ><span class="text-5xl font-bold">{{ userAcceptCount }}</span
        ><span class="text-zinc-500">總錄取專案數</span>
      </UContainer>
    </div>
    <div class="flex flex-col justify-between w-full pt-10 gap-6 md:flex-row">
      <div class="flex flex-col w-full max-w-sm pt-10 font-light text-white">
        <NuxtImg
          :src="userDetail.avatarUrl"
          alt="user-img"
          class="mb-4 rounded-full"
        />
        <h2 class="text-3xl font-bold">{{ userDetail.nickName }}</h2>
        <p class="mb-6 text-sm text-white/50">{{ userDetail.email }}</p>
        <p class="mb-3">{{ userDetail.profileDescription }}</p>
        <button
          v-if="authStore.userInfo.id === route.params.userId"
          class="px-4 py-1 border rounded-md border-zinc-800 bg-zinc-800/50 text-zinc-500 hover:text-white"
        >
          編輯個人檔案
        </button>
      </div>
      <div class="flex flex-col w-full max-w-sm gap-2">
        <h4 class="text-2xl">
          {{ personalProjects.length + " 則提案" }}
        </h4>
        <ProjectCard
          v-for="project in personalProjects"
          @click="router.push(`/app-platform/project/${project.id}`)"
          :key="project.id"
          :status="project.status"
          :isGraduationProject="project.graduationProject"
          :title="project.title"
          :school="project.school"
          :allowApplicantsNum="project.allowApplicantsNum"
          :applicantCount="project.applicants.length"
          :tags="project.tags"
          :imageURL="project.images[0]"
        />
      </div>
    </div>
  </div>
</template>
