<script setup>
import { useProjectStore } from "~/store/project";
const projectStore = useProjectStore();
const tagName = ref("");
</script>
<template>
  <div
    class="flex border border-dotted border-white py-2 items-center px-2 w-full justify-between"
  >
    <div class="justify-start w-1/12 flex items-center ps-2">
      <p class="flex text-white">標籤</p>
    </div>
    <div class="flex items-center justify-between w-11/12">
      <!--tags-->
      <div class="flex gap-2 items-center justify-start overflow-x-scroll px-2">
        <Tag v-for="tag in projectStore.tags" :key="tag" :tagName="tag" />
      </div>

      <button
        onclick="my_modal_2.showModal()"
        class="flex btn bg-gray-900/50 justify-center items-center"
      >
        <NuxtImg src="create.png" alt="create" class="w-4 h-4" />
      </button>

      <!--tag input modal-->
      <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg mb-4">新增標籤</h3>
          <input
            v-model="tagName"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs mb-14"
          />
          <div class="flex items-center justify-center px-3">
            <button
              @click="projectStore.addTag(tagName)"
              class="px-10 py-2 bg-white text-black font-semibold rounded-md"
            >
              加入
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>
