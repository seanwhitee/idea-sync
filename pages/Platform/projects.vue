<script setup>
import { useAuthStore } from "~/store/auth";
import { useProjectPoolStore } from "~/store/projectPool";
import { useSearchStore } from "~/store/search";
const authStore = useAuthStore();
const searchStore = useSearchStore();
const projectPoolStore = useProjectPoolStore();
const isLogin = authStore.isLogin;
const router = useRouter();

if (!isLogin || !authStore.userInfo.roleVerified) {
  throw new Error("Not authorized");
}

projectPoolStore.selectedGroup = "member_recruiting";

const openSearch = ref(false);

const { data: archiveDatas, error: archiveError } = useAsyncData(
  "getarchives",
  async () => {
    try {
      const response = await $fetch(
        `http://localhost:8080/api/v1/archive/getArchives?userId=${authStore.userInfo.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      projectPoolStore.archives = response;
      return response;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
);

onMounted(async () => {
  await fetchProjects("member_recruiting");
});

async function fetchProjects(status) {
  projectPoolStore.getProjects(status);
}

const handleGroupChange = async (status) => {
  await fetchProjects(status);
};

</script>
<template>
  <UModal v-model="openSearch">
    <div class="p-4 bg-black">
      <Searchbar class="mb-2" />
      <div
        class="flex flex-col items-center justify-start w-full gap-2 h-[300px] overflow-y-scroll"
      >
        <ProjectCard
          v-for="project in searchStore.search"
          v-if="searchStore.search.length > 0"
          @click="router.push(`Platform/project/${project.id}`)"
          :key="project.id"
          :status-id="project.statusId"
          :isGraduationProject="project.graduationProject"
          :title="project.title"
          :school="project.school"
          :allowApplicantsNum="project.allowApplicantsNum"
          :applicantCount="project.applicants.length"
          :tags="project.tags"
          :imageURL="project.images[0]"
        />
        <div v-if="searchStore.search.length == 0 && !searchStore.isSearching">
          <p class="flex items-center gap-2 justify-center py-10 text-zinc-500">
            <span>Press</span>
            <UKbd>Enter</UKbd>
            <span>to search</span>
          </p>
        </div>
        <Loader v-if="searchStore.isSearching" />
      </div>
    </div>
  </UModal>
    <div
      class="fixed flex flex-col items-center w-11/12 md:w-4/5 lg:w-4/5 mx-auto z-[1]"
    >
      <div
        class="flex justify-between px-4 py-2 mb-4 w-full border border-zinc-800 text-white"
      >
        <button
          class="flex justify-center px-4 py-2 w-1/2 ease-linear duration-200"
          :class="{
            'bg-zinc-800':
              projectPoolStore.selectedGroup === 'member_recruiting',
          }"
          @click="
            (projectPoolStore.selectedGroup = 'member_recruiting'),
              handleGroupChange('member_recruiting')
          "
        >
          <p class="text-lg">學生招募</p>
        </button>
        <button
          class="flex justify-center px-4 py-2 w-1/2 ease-linear duration-200"
          :class="{
            'bg-zinc-800':
              projectPoolStore.selectedGroup === 'mentor_recruiting',
          }"
          @click="
            (projectPoolStore.selectedGroup = 'mentor_recruiting'),
              handleGroupChange('mentor_recruiting')
          "
        >
          <p class="text-lg">指導者招募</p>
        </button>
      </div>
      <button
        @click="openSearch = true"
        class="flex border border-zinc-800 items-center justify-start w-full px-4 py-3 cursor-pointer"
      >
        <p class="flex items-center text-zinc-500">search...</p>
      </button>
    </div>
    <div
      v-if="!projectPoolStore.projectIsLoading"
      class="flex flex-col items-center justify-start gap-2 w-full mt-40"
    >
      <ProjectPost
        v-for="project in projectPoolStore.projects"
        :key="project.id"
        :project="project"
      />
    </div>
    <div
      v-if="projectPoolStore.projectIsLoading"
      class="flex flex-col items-center justify-start w-full mt-40"
    >
      <Loader />
    </div>
</template>
