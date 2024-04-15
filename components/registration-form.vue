
<script setup>
import { z } from "zod";
import { ref } from "vue";

// api end point
const registerEndPoint = "http://localhost:8080/api/v1/users/register";

const submitMessage = ref("");
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
  const result = {
    userName: state.username,
    password: state.password,
    nickName: state.nickName,
    profileDescription: state.profileDescription,
    email: state.email,
    emailVerified: false,
    avatarUrl: "default-avatar.png",
    firstName: state.firstName,
    lastName: state.lastName,
  };
  if (props.userRole === "creator") {
    // Prepare data for creator
    result.roleVerified = true;
    result.userRole = {
      id: 1,
      roleName: props.userRole,
    };
    result.allowProjectCreate = true;
    result.allowProjectApply = true;
  } else if (props.userRole === "mentor") {
    // Prepare data for mentor
    result.roleVerified = false;
    result.userRole = {
      id: 2,
      roleName: props.userRole,
    };
    result.allowProjectCreate = false;
    result.allowProjectApply = true
  }

  await $fetch(registerEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  }).then((response) => {
    switch (response) {
      case "user already exist":
        submitMessage.value = "使用者已經存在";
        break;
      case "user registration failed, data is not valid":
        submitMessage.value = "使用者註冊失敗，資料無效";
        break;
      case "user registered successfully":
        submitMessage.value = "註冊成功";
        router.push("/signin");
        break;
      default:
        break;
    }
  });
}
</script>
<template class="text-white">
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="電子郵件" name="email" class="w-full md:w-1/2 lg:w-1/2 ">
      <UInput v-model="state.email" class="rounded-md"/>
    </UFormGroup> 
    <UFormGroup label="帳號" name="username" class="w-full md:w-1/2 lg:w-1/2 ">
      <UInput v-model="state.username" class="rounded-md"/>
    </UFormGroup>
    <UFormGroup label="密碼" name="password" class="w-full md:w-1/2 lg:w-1/2 ">
      <UInput v-model="state.password" type="password"  class="rounded-md"/>
    </UFormGroup>
    <div class="flex w-full md:w-1/2 lg:w-1/2 justify-between gap-1 ">
      <UFormGroup label="名" name="firstName" class="w-2/3">
        <UInput v-model="state.firstName" class="rounded-md"/>
      </UFormGroup>
      <UFormGroup label="姓" name="lastName" class="w-1/3 " >
        <UInput v-model="state.lastName" class="rounded-md"/>
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

    <!--submit feeback-->
    <div
      v-if="submitMessage"
      class="flex items-center justify-center w-full md:w-1/2 lg:w-1/2"
    >
      <p
        v-if="submitMessage === '註冊成功'"
        class="text-green-500 font-extralight text-xs"
      >
        {{ submitMessage }}
      </p>
      <p
        v-if="submitMessage === '使用者已經存在'"
        class="text-red-500 font-extralight text-xs"
      >
        {{ submitMessage }}
      </p>
      <p
        v-if="submitMessage === '使用者註冊失敗，資料無效'"
        class="text-red-500 font-extralight text-xs"
      >
        {{ submitMessage }}
      </p>
    </div>
    <div
      class="w-full md:w-1/2 lg:w-1/2 flex justify-start pe-2 mt-4 text-whit font-extralight text-xs"
    >
      有帳號嗎？<NuxtLink to="/signin" class="underline">登入</NuxtLink>
    </div>
  </UForm>
</template>
