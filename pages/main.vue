<script setup>

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    class="inline-block w-5 h-5 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </button>
        </div>
        <div class="items-center font-bold my-2">
            <NuxtLink to="/" external class="text-white">Idea<span class="text-violet-500"
                    style="z-index: 1">Sync</span>
            </NuxtLink>
        </div>
        <div class="flex-none ml-10 w-1/3">
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="搜尋" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="w-4 h-4 opacity-70">
                    <path fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd" />
                </svg>
            </label>
        </div>
    </div>
    <div class="flex">
        <div class="relative h-screen w-32 text-center">

        </div>
        <div class="relative w-2/3 h-screen">
            <div class="flex justify-between px-4 py-2 m-4" style="background-color:rgba(217, 217, 217, 0.2);">
                <div class="flex justify-center px-4 py-2 w-1/2" style="background-color:rgba(217, 217, 217, 0.2);">
                    <p class=" text-white text-lg">學生招募</p>
                </div>
                <div class="flex justify-center px-4 py-2 w-1/2">
                    <p class="text-white text-lg">指導者招募</p>
                </div>
            </div>
            <div class="flex justify-between h-40 px-4 py-4" style="background-color:rgba(217, 217, 217, 0.2);">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col">
                        <p class=" text-white text-2xl font-bold">專題題目</p>
                        <p class=" text-white text-sm mt-1">專題的部分描述,大約抓20 ~ 50字顯示</p>
                    </div>
                    <div class="flex">
                        <p class="text-black text-xs bg-white rounded-2xl px-2 py-1 font-bold mr-2">畢業專題</p>
                        <p class="text-black text-xs bg-white rounded-2xl px-2 py-1 font-bold mr-2">畢業專題資工系</p>
                    </div>
                </div>

                <div class="h-1/2 w-1/6 mt-8" style="background-color:rgba(217, 217, 217, 0.2);"></div>
            </div>
        </div>
    </div>

</template>
