<script setup>
import { z } from "zod";
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { useAuth } from "../composable/useAuth";

const router = useRouter();
const submitMessage = ref("");
const authStore = useAuthStore();
const { login }  = useAuth();

const schema = z.object({
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
});
const state = reactive({
  username: undefined,
  password: undefined,
});

const onSubmit = async () => {
  const response = await $fetch(
    "http://localhost:8080/api/v1/users/login?username=" +
      state.username +
      "&password=" +
      state.password,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response === "") {
    submitMessage.value = "帳號密碼錯誤，或身份尚未通過申請";
  } else {
    // login successfull
    const user = response;
    login(user);
  }
};
</script>
<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="帳號" name="username" class="w-full">
      <UInput v-model="state.username" class="rounded-md" />
    </UFormGroup>
    <UFormGroup label="密碼" name="password" class="w-full">
      <UInput v-model="state.password" type="password" class="rounded-md" />
    </UFormGroup>
    <div class="w-full">
      <button
        type="submit"
        class="w-full bg-violet-800 hover:bg-violet-800/90 font-thin py-2 px-4 rounded-lg mt-0"
      >
        <div class="flex items-center justify-center w-full text-white">
          登入
        </div>
      </button>
    </div>

    <div v-if="submitMessage" class="flex items-center justify-center w-full">
      <p
        v-if="submitMessage === '帳號密碼錯誤，或身份尚未通過申請'"
        class="text-red-500 font-extralight text-xs"
      >
        {{ submitMessage }}
      </p>
    </div>
  </UForm>
</template>
