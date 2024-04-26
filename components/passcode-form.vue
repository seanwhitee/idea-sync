<script setup>
import { ref } from "vue";
import { set, z } from "zod";
const props = defineProps({
  userInfo: Object,
  passCode: Object,
  generatePassCode: Function,
  userRole: String,
});
const router = useRouter();
const submitMessage = ref("");
const schema = z.object({
  passCode: z.number().min(100000).max(999999),
});
const state = reactive({
  passCode: undefined,
});
const matcher = (userEnterPassCode, passCode) => {
  return userEnterPassCode === passCode;
};
const onSubmit = async (event) => {
  let successFlag = false;
  if (props.passCode.expiryTime < new Date().getTime()) {
    submitMessage.value = "驗證碼已過期";
  }
  if (matcher(state.passCode, props.passCode.code)) {
    submitMessage.value = "驗證成功";
    successFlag = true;
  } else {
    submitMessage.value = "驗證碼錯誤";
    successFlag = false;
  }

  if (successFlag) {
    const response = await $fetch(
      "http://localhost:8080/api/v1/users/saveUserData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: props.userInfo.username,
          password: props.userInfo.password,
          nickName: props.userInfo.nickName,
          profileDescription: props.userInfo.profileDescription,
          avatarUrl: props.userInfo.avatarURL,
          firstName: props.userInfo.firstName,
          lastName: props.userInfo.lastName,
          email: props.userInfo.email,
          roleVerified: props.userInfo.roleVerified,
          userRole: {
            id: props.userInfo.roleId,
            roleName: props.userRole,
          },
          allowProjectCreate: props.userInfo.allowProjectCreate,
          allowProjectApply: props.userInfo.allowProjectApply,
        }),
      }
    );
    switch (response) {
      case "User data saving failed":
        submitMessage.value = "註冊失敗";
        break;
      case "User data saved successfully":
        submitMessage.value = "註冊成功";
        router.push("/signin");
        break;
      default:
        break;
    }
  } else if (!successFlag) {
    router.push("/");
  }

  setTimeout(() => {
    submitMessage.value = "";
  }, 3000);
};
</script>
<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="驗證碼" name="passCode" class="w-full">
      <UInput v-model="state.passCode" class="rounded-md" type="number" />
    </UFormGroup>
    <div class="w-full flex flex-col gap-y-3">
      <button
        @click="props.generatePassCode()"
        class="w-full bg-violet-400/40 border border-violet-400 font-extralight py-2 px-4 rounded-lg mt-0"
      >
        重新發送驗證碼
      </button>
      <button
        type="submit"
        class="w-full bg-violet-400 hover:bg-violet-400/90 font-extralight py-2 px-4 rounded-lg mt-0"
      >
        <div class="flex items-center justify-center w-full text-white">
          提交
        </div>
      </button>
    </div>
    <div class="flex items-center justify-center w-full">
      <p
        v-if="
          submitMessage === '驗證碼已過期' ||
          submitMessage === '驗證碼錯誤' ||
          submitMessage === '註冊失敗'
        "
        class="text-red-500 font-extralight text-xs"
      >
        {{ submitMessage }}
      </p>
      <p
        v-if="submitMessage === '驗證成功' || submitMessage === '註冊成功'"
        class="text-green-500 font-extralight text-xs"
      >
        {{ submitMessage }}
      </p>
    </div>
  </UForm>
</template>
