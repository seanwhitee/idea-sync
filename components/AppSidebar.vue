<script setup>
import { ref, computed } from "vue";
import { useAuth } from "../composable/useAuth";

const props = defineProps({
  items: Array,
});
const navigationItems = computed(() => {
  return props.items.filter((item) => {
    return item.path && item.rule;
  });
});
const functionalItems = computed(() => {
  return props.items.filter((item) => {
    return !item.path && item.rule;
  });
});
const isAccountSwitchModalOpen = ref(false);
</script>
<template>
  <UModal v-model="isAccountSwitchModalOpen">
    <div class="p-10">
      <h3 class="mb-2 text-2xl font-bold">切換帳號</h3>
      <p class="mb-6 text-sm text-zinc-500">輸入您的帳號密碼以切換帳號</p>
      <LoginForm />
    </div>
  </UModal>

  <Transition name="slide-fade">
    <div
      class="bottom-0 md:top-0 left-0 h-16 md:h-full w-full md:w-20 lg:w-60 flex md:flex-col items-center justify-center border-t md:border-r border-gray-500/50 px-2 bg-black fixed overflow-y-scroll z-[2]"
    >
      <NuxtLink
        to="/app-platform/projects"
        external
        class="items-center justify-start hidden w-full text-2xl text-white ps-4 md:flex"
      >
        <img
          src="/public/favicon.png"
          alt="logo"
          class="hidden w-8 h-8 rounded-md md:flex lg:hidden"
        />
        <p class="hidden md:hidden lg:flex">
          Idea<span class="text-violet-500">Sync</span>
        </p>
      </NuxtLink>
      <div
        class="flex items-center justify-center w-full pt-4 pb-2 h-4/5 md:flex-col"
      >
        <ul
          class="flex items-center justify-start w-full h-full pt-4 pb-2 mb-2 md:flex-col md:overflow-y-scroll"
        >
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            class="py-1 mb-2 transition duration-300 ease-in-out rounded-lg w-14 md:w-full hover:bg-zinc-800 focus:outline-none"
            :to="item.path"
            @click="toggler = false"
          >
            <BarItem :name="item.name" :icon="item.icon" />
          </NuxtLink>
          <button
            v-for="item in functionalItems"
            :key="item.name"
            class="py-1 mb-2 transition duration-300 ease-in-out rounded-lg w-14 md:w-full hover:bg-zinc-800 focus:outline-none"
            @click="isAccountSwitchModalOpen = true"
          >
            <BarItem :name="item.name" :icon="item.icon" />
          </button>
        </ul>

        <div
          class="items-center justify-center hidden w-20 pb-2 md:flex md:w-full h-14 md:translate-y-14"
        >
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
