<script setup>
import tour from "~/components/tour.vue";

</script>
<template>

    <!-- <div class="bg-black box-border w-full border-b border-gray-500/50 flex items-center px-4 py-2 ">
        <div class="h-10 w-10 bg-white mr-4">
        <div class="h-15px w-15px bg-black">

        </div>
        
        </div>
        
    </div> -->
    <div class="navbar bg-black box-border w-full border-b border-gray-500/50 flex items-center px-4 py-2 ">
        <div class="flex-none">
            <button class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
        <div class="items-center font-bold my-2">
            <NuxtLink to="/" external class="text-white">Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
            </NuxtLink>
        </div>
        <div class="flex-none ml-10 w-1/3">
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="搜尋" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
            </label>
        </div>
    </div>
    <div class="flex">
        <div class="relative h-screen w-32 text-center">
        
        </div>
        <div class="relative w-2/3 h-screen">
            05
        </div>
    </div>
    
</template>
