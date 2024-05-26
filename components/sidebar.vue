<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const items = ref([
  { name: "創建提案", icon: "create.png", path: "/create-project" },
  { name: "瀏覽提案", icon: "browse.png", path: "/projects" },
  { name: "管理提案", icon: "manage.png", path: "/manage-project" },
  { name: "儀表板", icon: "dashboard.png", path: "/admin-dashboard" },
  { name: "個人檔案", icon: "default-avatar.png", path: "/profile" },

  { name: "收納", icon: "archive.png", path: "/archive" },
]);

const toggler = ref(false);
const router = useRouter();

const handleClick = (item) => {
  router.push(item.path);
};

// check if the user is creator or admin
const itemAllowShow = (routeName) => {
  if (routeName === "創建提案") {
    return authStore.userInfo.roleName === "creator";
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
    return authStore.userInfo.roleName === "creator" ||
    authStore.userInfo.roleName === "mentor";
  }
};

// Compute which items are visible based on the role
const visibleItems = computed(() => {
  return items.value.filter((item) => itemAllowShow(item.name));
});

</script>
<template>
  <!-- sidebar toggler-->
  <div
    @click="toggler = !toggler"
    class="fixed top-4 left-2 cursor-pointer z-[2] rounded-md"
  >
    <NuxtImg src="menus.png" alt="sidebar-toggler" class="w-8 h-8" />
  </div>

  <Transition name="slide-fade">
    <div
      v-if="toggler"
      class="top-0 left-0 flex flex-col items-center justify-center border-r border-gray-500/50 h-full w-60 px-2 
      bg-black fixed overflow-y-scroll z-[1]"
    >
      <div class="h-4/5 w-full pt-4 pb-2">
        <!--barItem container-->
        <ul
          class="w-full h-full flex flex-col items-center justify-start pt-4 pb-2 overflow-y-scroll mb-6"
        >
          <button
            v-for="item in visibleItems"
            :key="item.name"
            class="mb-2 w-full hover:bg-zinc-800 transition duration-300 ease-in-out rounded-lg focus:outline-none py-1"
            @click="handleClick(item)"
          >
            <BarItem :name="item.name" :icon="item.icon" />
          </button>
        </ul>
        <div class="flex items-center justify-center w-full h-14">
          <UserFunctionMenu />
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
