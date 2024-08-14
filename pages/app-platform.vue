<script setup>
import { useAuthStore } from "~/store/auth";
definePageMeta({
  colorMode: "dark",
});
const router = useRouter();
const authStore = useAuthStore();
router.push("/app-platform/projects");

const items = ref([
  {
    name: "創建提案",
    icon: "ic:sharp-create",
    path: "/app-platform/create-project",
    rule:
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "mentor",
  },
  {
    name: "瀏覽提案",
    icon: "ic:baseline-photo-camera",
    path: "/app-platform/projects",
    rule:
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "admin" ||
      authStore.userInfo.roleName === "mentor",
  },
  {
    name: "管理提案",
    icon: "ic:sharp-folder",
    path: "/app-platform/manage-project",
    rule:
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "mentor",
  },
  {
    name: "個人檔案",
    icon: "ic:baseline-account-circle",
    path: `/app-platform/user-profile/${authStore.userInfo.id}`,
    rule: true,
  },
  {
    name: "收納",
    icon: "mdi:archive-arrow-down",
    path: "/app-platform/archive",
    rule:
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "mentor",
  },
  {
    name: "儀表板",
    icon: "ic:baseline-space-dashboard",
    path: "/app-platform/admin-dashboard",
    rule: authStore.userInfo.roleName === "admin",
  },
  {
    name: "切換帳號",
    icon: "mdi:account-switch-outline",
    rule: true,
  },
]);
</script>
<template>
  <AppSidebar :items="items" />
  <div class="flex flex-col gap-4 w-full pt-4 pb-24 md:py-4 px-4 md:ps-24 lg:ps-64">
    <NuxtPage />
  </div>
</template>
