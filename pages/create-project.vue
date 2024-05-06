<script setup>
import { useAuthStore } from "~/store/auth";
import { useProjectStore } from "~/store/project";

const router = useRouter();

// 1. check if the user is login and role is verified
// 2. check if the user role is creator
// if not, redirect to home page
const authStore = useAuthStore();
const projectStore = useProjectStore();
if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  router.push("/");
}

if (!authStore.userInfo.roleName === "creator") {
  router.push("/");
}
</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <div
    class="flex flex-col items-center w-full md:w-3/5 lg:w-3/5 pt-36 mx-auto gap-4"
  >
    <TagContainer />
    <!--title-->
    <label class="form-control w-full bg-primary-content rounded-none">
      <input
        v-model="projectStore.title"
        type="text"
        placeholder="標題"
        class="input input-bordered w-full bg-black rounded-none"
      />
    </label>

    <!--allow applcant num-->
    <div class="w-full flex items-center justify-start">
      <label class="label gap-2">
        <span class="label-text">申請人數</span>
        <input
          v-model="projectStore.allowApplicantsNum"
          type="number"
          min="1"
          @change="
            (e) => {
              if (e.target.value < 1) {
                e.target.value = 1;
              }
            }
          "
          class="flex items-center justify-center outline-none bg-black py-2 border border-gray-500/30"
        />
      </label>
    </div>

    <!--is graduation project-->
    <div class="flex items-center justify-start w-full">
      <label class="label cursor-pointer gap-2">
        <span class="label-text">畢業專題</span>
        <span class="text-sm">否</span>
        <input
          v-model="projectStore.isGraduationProject"
          type="checkbox"
          class="toggle"
          checked
        />
        <span class="text-sm">是</span>
      </label>
    </div>

    <!--school-->
    <label class="form-control w-full bg-primary-content rounded-none">
      <input
        v-model="projectStore.school"
        type="text"
        placeholder="學校"
        class="input input-bordered w-full bg-black rounded-none"
      />
    </label>

    <!--description-->
    <textarea
      v-model="projectStore.description"
      class="w-full h-40 bg-black rounded-none textarea textarea-bordered"
      placeholder="說明"
    ></textarea>

    <!--image upload-->
    <div class="px-30 py-10 bg-violet-400/50 flex flex-col items-center justify-center w-full">
      <NuxtImg src="upload.png" alt="upload" class="w-12 mb-5" />
      <p class=" font-semibold text-lg mb-5">Allow content: jpeg, png</p>
      <input type="file"
      class="file-input file-input-bordered w-full max-w-xs bg-violet-400"
      accept="image/jpeg, image/png"
      />
    </div>
    <!--submit button-->
    <div class="w-full flex items-cente justify-end mt-10">
      <button class="btn bg-white text-black">
        發布
      </button>
    </div>
  </div>
</template>
