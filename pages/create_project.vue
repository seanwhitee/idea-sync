<script setup>
</script>
<template>
    <div class="flex flex-col items-center w-full">
        <div id="tag" class="flex border border-gray h-10 w-1/2 flex-row rounded-sm m-3">
            <div class="h-10 inline-block self-start flex flex-row items-center">
                <p class="text-white px-2">標籤</p>
                <button class="bg-purple-400 hover:bg-purple-300 text-white font-bold px-2 rounded-lg">
                    畢業專題
                </button>
            </div>
            <div class="flex justify-center ml-auto">
                <button class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                    +
                </button>
            </div>
        </div>
        <input type="text" id="title" name="title" class="text-xl w-1/2 bg-gray-800 text-white px-2 py-2"
            placeholder="標題">
        <div class="flex h-10 w-1/2 flex-row m-2">
            <div class="h-10 inline-block self-start flex flex-row items-center">
                <p class="text-white px-2 mr-2 text-lg">申請人數</p>
                <input type="number" id="applicant" name="applicant"
                    class="bg-gray-800 text-white font-bold py-1 px-4 rounded-lg w-16 mr-20">
                <input type="checkbox" id="teacher" name="teacher" class="w-6 h-6 bg-black mg-2 mr-2">
                <p class="text-white px-2 mr-2 text-lg">需指導者</p>
            </div>
        </div>
        <input type="text" id="school" name="school" class="text-xl w-1/2 bg-gray-800 text-white px-2 py-2 mb-3"
            placeholder="學校">
        <input type="text" id="description" name="description"
            class="h-100 w-1/2 relative text-xl bg-gray-800 text-white px-2 py-2" placeholder="說明">
        <div class="flex flex-col items-center w-1/2 bg-violet-400 m-3 py-3">
            <img src="/assets/images/upload.png" alt="upload" class="w-14 h-14 opacity-100" />
            <p class="text-violet-500 px-2 mr-2 text-2xl opacity-100">Choose files or drag and drop</p>
            <p class="text-white px-2 mr-2 text-lg opacity-100">Allowed content</p>
            <button
                class="bg-violet-600 hover:bg-violet-900 text-white text-2xl font-bold py-2 px-6 m-3 rounded-lg">Ready</button>
        </div>
    </div>
</template>