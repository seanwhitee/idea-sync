<script setup>
// props annotation
const props = defineProps({
  userRole: String,
});
</script>
<template>
  <form class="w-fit pe-3 py-4 text-whtie">
    <!-- Email -->
    <div class="mb-4 pe-2">
      <label for="email" class="block text-sm font-extralight text-white"
        >電子郵件</label
      >
      <input
        type="email"
        id="email"
        name="email"
        class="mt-1 block w-full bg-black border border-white rounded-lg py-2 ps-2 pe-2"
        required
      />
    </div>
    <!-- Username -->
    <div class="mb-4 pe-2">
      <label for="username" class="block text-sm font-extralight text-white"
        >帳號</label
      >
      <input
        type="text"
        id="username"
        name="username"
        class="mt-1 block w-full bg-black border border-white rounded-lg py-2 ps-2 pe-2"
        required
      />
    </div>
    <!-- Password -->
    <div class="mb-4 pe-2">
      <label for="password" class="block text-sm font-extralight text-white"
        >密碼</label
      >
      <input
        type="password"
        id="password"
        name="password"
        class="mt-1 block w-full bg-black border border-white rounded-lg py-2 ps-2 pe-2"
        required
      />
    </div>
    <!--firstname and lastname container-->
    <div class="flex items-center">
      <!-- First Name -->
      <div class="mb-4 pe-2">
        <label for="firstName" class="block text-sm font-extralight text-white"
          >名</label
        >
        <input
          type="text"
          id="firstName"
          name="firstName"
          class="mt-1 block bg-black border border-white rounded-lg py-2 ps-2 pe-2"
          required
        />
      </div>
      <!-- Last Name -->
      <div class="mb-4 pe-2">
        <label for="lastName" class="block text-sm font-extralight text-white"
          >姓</label
        >
        <input
          type="text"
          id="lastName"
          name="lastName"
          class="mt-1 block bg-black border border-white rounded-lg py-2 ps-2 pe-2"
          required
        />
      </div>
    </div>
    <!-- Nickname -->
    <div class="mb-4 pe-2">
      <label for="nickname" class="block text-sm font-extralight text-white"
        >顯示明稱</label
      >
      <input
        type="text"
        id="nickname"
        name="nickname"
        class="mt-1 block w-full bg-black border border-white rounded-lg py-2 ps-2 pe-2"
        required
      />
    </div>
    <!-- Profile Description -->
    <div class="mb-4 pe-2">
      <label
        for="profileDescription"
        class="block text-sm font-extralight text-white"
        >專長描述</label
      >
      <textarea
        id="profileDescription"
        name="profileDescription"
        rows="3"
        class="form-textarea mt-1 block w-full bg-black border border-white rounded-lg py-2 ps-2 pe-2"
        required
      ></textarea>
    </div>
    <!-- Conditional render the submit button based on the userRole -->
    <div v-if="userRole === 'creator'" class="pe-2 mb-6">
      <button
        type="submit"
        class="w-full bg-violet-400 hover:bg-violet-400/90 font-extralight py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        註冊
      </button>
    </div>
    <div v-else class="pe-2">
      <p class="font-extralight text-xs mb-1">申請後請等待審核通過</p>
      <button
        type="submit"
        class="w-full bg-violet-400 hover:bg-violet-400/90 font-extralight py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        申請
      </button>
    </div>

    <!--If the user already registered before, provide a link to signin page-->
    <div class="flex justify-start pe-2 mt-4 text-whit font-extralight text-xs">
      有帳號嗎？<NuxtLink to="/signin" class="underline">登入</NuxtLink>
    </div>
  </form>
</template>
