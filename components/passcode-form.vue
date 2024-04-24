<script setup>
import { ref } from "vue";
import { z } from "zod";
const props = defineProps({
  userInfo: Object,
  stepCount: Number,
  correctPassCode: Number,
  expiryTime: String,
  updateUserInfo: Function,
  updateStep: Function,
});
const router = useRouter();
const submitMessage = ref("");

const schema = z.object({
  userEnterPassCode: z.number().min(100000, "請輸入6位數字"),
});
const state = reactive({
  userEnterPassCode: undefined,
});

const passCodeMatcher = (correctCode, userCode) => {
  return correctCode === userCode;
};
async function onSubmit(event) {
  let isValidFlag = false;
  // check the current time is less than expiry time
  const currentTime = new Date().getTime();
  const expiryTime = new Date(props.expiryTime).getTime();

  if (currentTime < expiryTime) {
    // check if passcode is correct, show success message
    if (passCodeMatcher(props.correctPassCode, state.userEnterPassCode)) {
      submitMessage.value = "驗證成功";
      isValidFlag = true;
    } else {
      submitMessage.value = "驗證失敗";
      isValidFlag = false;
    }
  } else {
    submitMessage.value = "驗證失敗";
    isValidFlag = false;
  }

  // if auth correct, call api to update email verified status
  // if incorrect, call api to delete that user records in database
  if (isValidFlag === true) {
    // call api to update email verified status
    const updateEmailVerifiedEndPoint = "http://localhost:8080/api/v1/users/markEmailAsVerified?username=" + props.userInfo.userName;
    const response = await $fetch(updateEmailVerifiedEndPoint, {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // update user info
    props.updateUserInfo({
      ...props.userInfo,
      emailVerified: true,
    });
    // update step
    props.updateStep(props.stepCount + 1);
  } else {
    // call api to delete that user records in database
    const deleteEndPoint = "http://localhost:8080/api/v1/users/deleteUser?username=" + props.userInfo.userName;
    const response = await $fetch(deleteEndPoint, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setTimeout(() => {
    if (isValidFlag) {
      router.push("/signin");
      submitMessage.value = "";
    }
    else if (!isValidFlag) {
      router.push("/"); 
      submitMessage.value = "";
    }
  }, 3000);
}
</script>
<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 w-full md:w-1/2 lg:w-1/2"
    @submit="onSubmit"
  >
    <UFormGroup label="輸入驗證碼" name="userEnterPassCode" class="w-full">
      <UInput v-model="state.userEnterPassCode" type="number" />
    </UFormGroup>
    <div v-if="submitMessage==='驗證失敗'" class="w-full text-center">
      <p class="text-red-500">{{ submitMessage }}</p>
    </div>
    <div v-if="submitMessage==='驗證成功'" class="w-full text-center">
      <p class="text-green-500">{{ submitMessage }}</p>
    </div>
    <button
      type="submit"
      class="w-full bg-violet-400 hover:bg-violet-400/90 font-extralight py-2 px-4 rounded-lg mt-0"
    >
      <div class="flex items-center justify-center w-full text-white">提交</div>
    </button>
  </UForm>
</template>
