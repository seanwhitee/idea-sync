<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/store/auth";
import { useAuth } from "../composable/useAuth";

const authStore = useAuthStore();

const items = ref([
  {
    name: "創建提案",
    icon: "ic:sharp-create",
    path: "/Platform/create-project",
  },
  {
    name: "瀏覽提案",
    icon: "ic:baseline-photo-camera",
    path: "/Platform/projects",
  },
  {
    name: "管理提案",
    icon: "ic:sharp-folder",
    path: "/Platform/ManageProject",
  },
  {
    name: "儀表板",
    icon: "ic:baseline-space-dashboard",
    path: "/admin-dashboard",
  },
  {
    name: "個人檔案",
    icon: "ic:baseline-account-circle",
    path: `/Platform/Profile/${authStore.userInfo.id}`,
  },
  { name: "收納", icon: "ic:baseline-archive", path: "/Platform/archive" },
]);

const toggler = ref(false);
const isAccountSwitchModalOpen = ref(false);
const { logout } = useAuth();
// check if the user is creator or admin
const itemAllowShow = (routeName) => {
  if (routeName === "創建提案") {
    return (
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "mentor"
    );
  } else if (routeName === "瀏覽提案") {
    return (
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "admin" ||
      authStore.userInfo.roleName === "mentor"
    );
  } else if (routeName === "管理提案") {
    return (
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "mentor"
    );
  } else if (routeName === "儀表板") {
    return authStore.userInfo.roleName === "admin";
  } else if (routeName === "個人檔案") {
    return true;
  } else if (routeName === "收納") {
    return (
      authStore.userInfo.roleName === "creator" ||
      authStore.userInfo.roleName === "mentor"
    );
  }
};

// Compute which items are visible based on the role
const visibleItems = computed(() => {
  return items.value.filter((item) => itemAllowShow(item.name));
});
</script>
<template>
  <UModal v-model="isAccountSwitchModalOpen">
    <div class="p-10">
      <h3 class="font-bold text-2xl mb-2">切換帳號</h3>
      <p class="text-zinc-500 text-sm mb-6">輸入您的帳號密碼以切換帳號</p>
      <LoginForm />
    </div>
  </UModal>
  <!-- sidebar toggler-->
  <div
    @click="toggler = !toggler"
    class="fixed top-4 left-2 cursor-pointer z-[3] rounded-md"
  >
    <Icon name="ic:outline-menu" class="w-8 h-8 text-white" />
  </div>

  <Transition name="slide-fade">
    <div
      v-if="toggler"
      class="top-0 left-0 flex flex-col items-center justify-center border-r border-gray-500/50 h-full w-60 px-2 bg-black fixed overflow-y-scroll z-[2]"
    >
      <div class="h-4/5 w-full pt-4 pb-2">
        <!--barItem container-->
        <ul
          class="w-full h-full flex flex-col items-center justify-start pt-4 pb-2 overflow-y-scroll mb-6"
        >
          <NuxtLink
            v-for="item in visibleItems"
            :key="item.name"
            class="mb-2 w-full hover:bg-zinc-800 transition duration-300 ease-in-out rounded-lg focus:outline-none py-1"
            :to="item.path"
          >
            <BarItem :name="item.name" :icon="item.icon" />
          </NuxtLink>
        </ul>
        <div class="flex items-center justify-center w-full h-14">
          <UserFunctionMenu>
            <li
              @click="isAccountSwitchModalOpen = true"
              class="hover:bg-zinc-800/50 rounded-lg"
            >
              <p class="py-4">切換帳號</p>
            </li>
            <li @click="logout();" class="hover:bg-zinc-800/50 rounded-lg">
              <p class="py-4">登出</p>
            </li>
          </UserFunctionMenu>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
