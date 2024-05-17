<template>
  <button
    class="flex items-center fixed left-48 top-3.5 px-3 py-1 border border-gray-600 hover:bg-zinc-900/50 bg-zinc-800 rounded-md"
  >
    <div @click="searchStore.isOpen = true" class="text-gray-600 me-4">Search...</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="w-4 h-4 opacity-70"
    >
      <path
        fill-rule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
<script setup>
import { useSearchStore } from "~/store/searchbar";
const searchStore = useSearchStore();
const isOpen = searchStore.isOpen;
</script>
