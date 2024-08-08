<script></script>
<template>
    <LoginedNavbar />
    <Sidebar />

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>

    <body class="bg-gray-900 text-white ">

        <div class="flex justify-center content-center w-screen h-screen p-8 pt-20 ">
            <!-- Profile Section -->
            <div class="flex mr-5 h-100 p-10">
                <div class="flex flex-col items-center">
                    <div class="w-60 h-60 bg-gray-800 rounded-full flex items-center justify-center">
                        <svg class="w-20 h-20 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                            </path>
                        </svg>
                    </div>
                    <div class="flex flex-col W-full">
                        <div class="flex flex-col mb-5">
                            <h1 class="text-xl mt-4">PaiPai</h1>
                            <p class="text-gray-500">blackseanx@gmail.com</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-center mt-2">Hi! I'm Sean Pai. A person who loves sharing and learning.</p>
                            <button class="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">編輯個人檔案</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 w-full max-w-4xl p-3">
                <div class="flex mt-8 space-x-8 mb-10">
                    <div class="flex flex-col w-1/2 p-3">
                        <span class="text-3xl">10</span>
                        <span class="text-gray-500">總留言數</span>
                    </div>
                    <div class="flex flex-col w-1/2 p-3">
                        <span class="text-3xl">17</span>
                        <span class="text-gray-500">總錄取專案數</span>
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <div class="bg-white bg-opacity-10 p-4 rounded-md m-2 w-5/12">
                        <div class="flex justify-between">
                            <div class="flex flex-col justify-between">
                                <div>
                                    <h2 class="text-lg">Other Project 2</h2>
                                    <p>進甲大學 | 需求: 3 | 應徵: 0</p>
                                </div>
                                <div class="flex space-x-2">
                                    <span class="px-2 py-1 bg-blue-600 rounded">專案教練</span>
                                    <span class="px-2 py-1 bg-indigo-600 rounded">VUE</span>
                                </div>
                            </div>
                            <div class="flex self-center">
                                <div class="bg-white bg-opacity-50 w-20 h-20"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white bg-opacity-10 p-4 rounded-md m-2 w-5/12">
                        <div class="flex justify-between">
                            <div class="flex flex-col justify-between">
                                <div>
                                    <h2 class="text-lg">Other Project 2</h2>
                                    <p>進甲大學 | 需求: 3 | 應徵: 0</p>
                                </div>
                                <div class="flex space-x-2">
                                    <span class="px-2 py-1 bg-blue-600 rounded">專案教練</span>
                                    <span class="px-2 py-1 bg-indigo-600 rounded">VUE</span>
                                </div>
                            </div>
                            <div class="flex self-center">
                                <div class="bg-white bg-opacity-50 w-20 h-20"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white bg-opacity-10 p-4 rounded-md m-2 w-5/12">
                        <div class="flex justify-between">
                            <div class="flex flex-col justify-between">
                                <div>
                                    <h2 class="text-lg">Other Project 2</h2>
                                    <p>進甲大學 | 需求: 3 | 應徵: 0</p>
                                </div>
                                <div class="flex space-x-2">
                                    <span class="px-2 py-1 bg-blue-600 rounded">專案教練</span>
                                    <span class="px-2 py-1 bg-indigo-600 rounded">VUE</span>
                                </div>
                            </div>
                            <div class="flex self-center">
                                <div class="bg-white bg-opacity-50 w-20 h-20"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </body>
</template>
<style></style>