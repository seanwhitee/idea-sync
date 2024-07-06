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
  router.push("/");
}

const openSearch = ref(false);

const { data: archiveDatas, error: archiveError } = useAsyncData('getarchives', async () => {
  try {
    const response = await $fetch(`http://localhost:8080/api/v1/archive/getArchives?userId=${authStore.userInfo.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    projectPoolStore.archives = response;
    return response;
  } catch (e) {
    console.error(e);
    return [];
  }
});

async function fetchProjects(status) {
  projectPoolStore.getProjects(status);
}

// Fetch projects on first page load
const { data: projectDatas, pending, error: projectErrors } = useAsyncData('projects', () => fetchProjects('member_recruiting'));

const handleGroupChange = async (status) => {
  await fetchProjects(status);
}
</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <!-- search opened modal-->
  <UModal v-model="openSearch">
    <div class="p-4 bg-black">
      <!-- <Placeholder class="h-48" /> -->
      <Searchbar class="mb-2" />
      <div class="flex flex-col items-center justify-start w-full gap-2
      h-[300px] overflow-y-scroll">
        <ProjectCard
          v-for="project in searchStore.search"
          v-if="searchStore.search.length > 0"
          @click="router.push(`/project/${project.id}`)"
          :key="project.id"
          :isGraduationProject="project.graduationProject"
          :title="project.title"
          :school="project.school"
          :allowApplicantsNum="project.allowApplicantsNum"
          :applicantCount="project.applicantCount"
          :tags="project.tags"
          :imageURL="project.images[0]"
        />
        <div v-if="searchStore.search.length == 0
        && !searchStore.isSearching">
          <p class="flex items-center justify-center py-10 text-zinc-500">
            No results</p>
        </div>
        <Loader v-if="searchStore.isSearching" />
      </div>
    </div>
  </UModal>
  <div
    class="flex flex-col items-center w-11/12 md:w-4/5 lg:w-4/5 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-4"
  >
    <div
      class="flex justify-between px-4 py-2 my-4 w-full border border-zinc-800"
    >
      <button
        class="flex justify-center px-4 py-2 w-1/2 ease-linear duration-200"
        :class="{
          'bg-zinc-800': projectPoolStore.selectedGroup === 'member_recruiting',
        }"
        @click="
          projectPoolStore.selectedGroup =
            'member_recruiting',
					handleGroupChange('member_recruiting')
        "
      >
        <p class="text-white text-lg">學生招募</p>
      </button>
      <button
        class="flex justify-center px-4 py-2 w-1/2 ease-linear duration-200"
        :class="{
          'bg-zinc-800': projectPoolStore.selectedGroup === 'mentor_recruiting',
        }"
        @click="
          projectPoolStore.selectedGroup =
            'mentor_recruiting',
					handleGroupChange('mentor_recruiting')
        "
      >
        <p class="text-white text-lg">指導者招募</p>
      </button>
    </div>
    <!-- fake search button-->
    <button @click="openSearch = true"
    class="flex border border-zinc-800 items-center justify-start w-full px-4 py-3 
    cursor-pointer">
      <p class="flex items-center text-zinc-500">search...</p>
    </button>

    <div v-if="!projectPoolStore.projectIsLoading"
      class="flex flex-col items-center justify-start  gap-2 w-full">
      <ProjectPost 
      v-for="project in projectPoolStore.projects" 
      :key="project.id" 
      :project="project" />
    </div>
    <div v-if="projectPoolStore.projectIsLoading" 
      class="flex flex-col items-center justify-center w-full">
      <Loader />
    </div>
  </div>
</template>
