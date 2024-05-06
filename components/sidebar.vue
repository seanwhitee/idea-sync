<script setup>
const items = ref([
  { name: "創建提案", icon: "create.png", path: "/create-project" },
  { name: "瀏覽提案", icon: "browse.png", path: "/projects" },
  { name: "管理提案", icon: "manage.png", path: "/manage-project" },
]);
const toggler = ref(false);
const router = useRouter();

const handleClick = (item) => {
  router.push(item.path);
};
</script>
<template>
  <!-- sidebar toggler-->
  <div @click="toggler = !toggler" class="fixed top-4 left-2 cursor-pointer z-[1] rounded-md">
    <NuxtImg src="menus.png" alt="sidebar-toggler" class="w-8 h-8" />
  </div>

  <Transition name="slide-fade">
    <div
      v-if="toggler"
      class="top-0 left-0 flex flex-col items-center justify-center border-r border-gray-500/50 h-full w-56 px-2 bg-black fixed overflow-y-scroll"
    >
      <div class="h-4/5 w-full pt-4 pb-2">
        <!--barItem container-->
        <ul
          class="w-full h-full flex flex-col items-center justify-start pb-2 overflow-y-scroll mb-6"
        >
          <button
            v-for="item in items"
            :key="item.name"
            class="mb-2 w-full hover:bg-gray-500 transition duration-300 ease-in-out rounded-lg focus:outline-none"
            @click="handleClick(item)"
          >
            <BarItem :name="item.name" :icon="item.icon" />
          </button>
        </ul>
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
