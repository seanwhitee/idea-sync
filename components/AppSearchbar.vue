<script setup>
import { useSearchStore } from "~/store/search";

const searchStore = useSearchStore();
</script>
<template>
  <div
    class="flex items-center w-full px-3 py-3 bg-black border shadow-xl cursor-pointer border-zinc-800"
  >
    <!--search input-->
    <input
      type="text"
      placeholder="search..."
      class="w-11/12 bg-black outline-none focus:outline-none"
      v-model="searchStore.searchString"
      @keyup.enter="searchStore.startSearch(searchStore.searchString)"
    />
    <!--search icon-->
    <div class="flex items-center justify-end w-1/12">
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
