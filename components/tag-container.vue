<script setup>
import { useProjectStore } from "~/store/project";
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const projectStore = useProjectStore();
const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
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
      <div class="flex gap-2 items-center justify-start overflow-x-scroll px-2 w-11/12">
        <Tag v-for="tag in projectStore.tags" :key="tag" :tagName="tag" />
      </div>

      <div class="flex items-center justify-center w-1/12">
        <button
          type="button"
          @click="openModal"
          class="rounded-md bg-black/20 p-1 text-sm font-medium text-white hover:bg-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <NuxtImg src="create.png" alt="create-tag-icon" key="create" class="w-4"/>
        </button>
      </div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all text-white"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 mb-4"
                  >
                    輸入標籤
                  </DialogTitle>
                  <div class="mt-2 w-full">
                    <input v-model="tagName" type="text" placeholder="Type here..." class="border border-gray-500/50 outline-none rounded-md px-3 py-3 text-sm font-light w-full" />
                  </div>

                  <div class="mt-4 flex items-center justify-end">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="projectStore.addTag(tagName)"
                      :disabled="!tagName"
                    >
                      加入
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>
