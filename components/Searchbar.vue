<script setup>
import { useSearchStore } from "~/store/search";

const searchStore = useSearchStore();
</script>
<template>
  <div
    class="flex items-center bg-black cursor-pointer px-3 py-3 border border-zinc-800 shadow-xl w-full"
  >
    <!--search input-->
    <input
      type="text"
      placeholder="search..."
      class="focus:outline-none outline-none w-11/12 bg-black"
      v-model="searchStore.searchString"
      @keyup.enter="searchStore.startSearch(searchStore.searchString)"
    />
    <!--search icon-->
    <div class="w-1/12 flex items-center justify-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0
        1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>
