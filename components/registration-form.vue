<script setup>
import { z } from "zod";

// props annotation
const props = defineProps({
  userRole: String,
});
const router = useRouter();
const schema = z.object({
  email: z.string().email("不符合信箱格式"),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "使用者名稱只能包含字母和數字")
    .min(7, "使用者名稱必須大於6個字符"),
  password: z
    .string()
    .regex(/[a-z]/, "密碼必須包含至少一個小寫字母")
    .regex(/[A-Z]/, "密碼必須包含至少一個大寫字母")
    .regex(/[0-9]/, "密碼必須包含至少一位數字")
    .min(9, "密碼長度必須至少為 9 個字符")
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: "密碼只能包含字母和數字",
    }),
  firstName: z.string(),
  lastName: z.string(),
  nickName: z.string(),
  profileDescription: z.string().min(11, "專長描述必須大於10個字符"),
});

const state = reactive({
  email: undefined,
  username: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
  nickName: undefined,
  profileDescription: undefined,
});

async function onSubmit(event) {
  // if (userRole === "creator") {
  //   // do something
  // } else if (userRole === "mentor") {
  //   // do something
  // }
  router.push("/signin");
}
</script>
<template class="text-white">
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="電子郵件" name="email" class="w-full md:w-1/2 lg:w-1/2 ">
      <UInput v-model="state.email" class="bg-white rounded-md"/>
    </UFormGroup> 
    <UFormGroup label="帳號" name="username" class="w-full md:w-1/2 lg:w-1/2 ">
      <UInput v-model="state.username" class="bg-white rounded-md"/>
    </UFormGroup>
    <UFormGroup label="密碼" name="password" class="w-full md:w-1/2 lg:w-1/2 ">
      <UInput v-model="state.password" type="password"  class="bg-white rounded-md"/>
    </UFormGroup>
    <div class="flex w-full md:w-1/2 lg:w-1/2 justify-between gap-1 ">
      <UFormGroup label="名" name="firstName" class="w-2/3">
        <UInput v-model="state.firstName" class="bg-white rounded-md"/>
      </UFormGroup>
      <UFormGroup label="姓" name="lastName" class="w-1/3 " >
        <UInput v-model="state.lastName" class="bg-white rounded-md"/>
      </UFormGroup>
    </div>
    <UFormGroup
      label="顯示名稱"
      name="nickName"
      class="w-full md:w-1/2 lg:w-1/2"
    >
      <UInput class="bg-white rounded-md" v-model="state.nickName" />
    </UFormGroup>
    <UFormGroup
      label="專長描述"
      name="profileDescription"
      class="w-full md:w-1/2 lg:w-1/2"
    >
      <UTextarea class="bg-white rounded-md" v-model="state.profileDescription" />
    </UFormGroup>
    <div class="w-full md:w-1/2 lg:w-1/2">
      <p v-if="userRole === 'mentor'" class="font-extralight text-xs mb-1">
        申請後請等待審核通過
      </p>
      <button
        type="submit"
        class="w-full bg-violet-400 hover:bg-violet-400/90 font-extralight py-2 px-4 rounded-lg mt-0"
      >
        <div
          v-if="userRole === 'creator'"
          class="flex items-center justify-center w-full text-white"
        >
          註冊
        </div>
        <div v-else class="flex items-center justify-center w-full">申請</div>
      </button>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/2 flex justify-start pe-2 mt-4 text-whit font-extralight text-xs">
      有帳號嗎？<NuxtLink to="/signin" class="underline">登入</NuxtLink>
    </div>
  </UForm>
</template>
