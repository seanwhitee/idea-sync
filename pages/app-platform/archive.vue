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
  <h3 class="flex items-center text-xl gap-3">
    <Icon name="mdi:archive-arrow-down" class="w-8 h-8" />
    我的收藏</h3>
  <ProjectPost
    v-for="project in projectPoolStore.archives"
    :key="project.id"
    :project="project"
  />
</template>
