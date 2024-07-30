<script setup>
import { useAuthStore } from "~/store/auth";
import { useProjectPoolStore } from "~/store/projectPool";
import { useRouter, useAsyncData } from "#app";

const router = useRouter();
const authStore = useAuthStore();
const projectPoolStore = useProjectPoolStore();

if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  router.push("/");
}
definePageMeta({
  colorMode: "dark",
});

const { data, error } = useAsyncData("getarchives", async () => {
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
});
</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <div
    class="flex flex-col items-center w-11/12 md:w-4/5 lg:w-4/5 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-4"
  >
    <ProjectPost
      v-for="project in projectPoolStore.archives"
      :key="project.id"
      :project="project"
    />
  </div>
</template>
