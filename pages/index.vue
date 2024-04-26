<script setup>
import { useAuthStore } from '~/store/auth';
const router = useRouter();
const authStore = useAuthStore();
const isLogin = authStore.isLogin;
if (isLogin) {
    router.push("/projects")
}
const featuresData = [
  {
    image: "white-check.png",
    title: "撰寫提案",
    color: "white",
  },
  {
    image: "white-check.png",
    title: "招募成員",
    color: "white",
  },
  {
    image: "white-check.png",
    title: "找尋指導者",
    color: "white",
  },
  {
    image: "purple-check.png",
    title: "完成專案招募",
    color: "violet-500",
  },
];
</script>
<template>
  <navbar />
  <div class="flex flex-col w-4/5 mx-auto">
    <div class="mt-40 md:mt-80 lg:mt-80">
			<div class="text-6xl">
      <p class="text-white font-bold">找專題成員？</p>
      <p class="text-white font-bold">
        使用Idea<span class="text-violet-500 font-bold">Sync</span>
      </p>
			</div>
      <br />
      <p class="text-white text-lg font-bold">讓想法與行動相遇</p>
    </div>
    <div class="mt-40 md:mt-40 lg:mt-80 mb-40">
      <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row">
        <div class="w-1/2 mb-40">
          <div
            v-for="feature in featuresData"
            class="flex items-center"
            :key="feature.title"
          >
            <NuxtImg :src="feature.image" />
            <p :class="`text-2xl ml-4 text-${feature.color}`">
              {{ feature.title }}
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/2">
          <p class="text-white text-4xl md:text-6xl lg:text-6xl">找尋夥伴從未如此簡單</p>
          <NuxtLink to="/signup"
            ><button
              class="mt-20 bg-violet-500 text-white text-2xl font-bold text-center py-4 px-10 rounded-full flex items-center justify-center"
            >
              開始使用
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
