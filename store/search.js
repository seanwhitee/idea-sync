import { defineStore } from "pinia";

export const useSearchStore = defineStore(
  "search",
  () => {
    const isSearching = ref(false);
    const searchString = ref('');

    const startSearch = async (searchString) => {
      if(!searchString) return;
      isSearching.value = true;
      try {
        await $fetch(`http://localhost:8080/api/v1/project/search?searchString=${searchString}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          search.value = [...res];
          isSearching.value = false;
        });
        
      } catch (error) {
        isSearching.value = false;
        console.error(error);
      }
    };

    // list of projects
    const search = ref([]);
    return { 
      startSearch,
      searchString,
      isSearching,
      search };
  }
);