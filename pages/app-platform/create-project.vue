<script setup>
import { useAuthStore } from "~/store/auth";
import { useProjectStore } from "~/store/project";

// handle createProject api response message
const messageMap = {
  "User is not allowed to create project": "您的狀態無法創建提案",
  "Invalid project data": "資料不完整",
  "Project with the same title already exists": "此提案已存在",
  "Project created successfully": "提案創建成功",
  "Project created failed": "提案創建失敗",
};

const router = useRouter();
const toast = useToast();
const tagModalOpen = ref(false);
const tagInputString = ref("");

const authStore = useAuthStore();
const projectStore = useProjectStore();
if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  throw new Error("Not authorized");
}

if (authStore.userInfo.roleName === "admin") {
  throw new Error("You cannot access this page");
}

projectStore.reset();

const isSubmitProcessing = ref(false);
const file = ref(null);
const previewUrl = ref(null);
const statusMessage = ref("");
const messageType = ref("error");

const handleFileChange = (e) => {
  file.value = e.target.files?.[0] ?? null;
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  if (file.value) {
    const url = URL.createObjectURL(file.value);
    previewUrl.value = url;
  } else {
    previewUrl.value = null;
  }
};

const computeSHA256 = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const isValidInputData = (
  title,
  description,
  school,
  requireSkills,
  tags,
  file
) => {
  if (
    !title ||
    !description ||
    !school ||
    !file ||
    !requireSkills ||
    tags.length === 0
  ) {
    statusMessage.value = "請填寫完整資料";
    messageType.value = "warning";
    setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
    return false;
  }

  if (tags.length > 10) {
    statusMessage.value = "標籤需為10個以內";
    messageType.value = "warning";
    setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
    return false;
  }

  if (requireSkills.length > 100) {
    statusMessage.value = "所需技能需為100字以內";
    messageType.value = "warning";
    setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
    return false;
  }

  if (description.length > 100) {
    statusMessage.value = "說明需為100字以內";
    messageType.value = "warning";
    setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  isSubmitProcessing.value = true;

  if (
    !isValidInputData(
      projectStore.title,
      projectStore.description,
      projectStore.school,
      projectStore.requireSkills,
      projectStore.tags,
      file.value
    )
  ) {
    isSubmitProcessing.value = false;
    return;
  }

  if (!authStore.userInfo.allowProjectCreate) {
    statusMessage.value = "您的狀態無法創建提案";
    isSubmitProcessing.value = false;
    messageType.value = "error";
    setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
    return;
  }

  const checksum = await computeSHA256(file.value);

  try {
    const response = await $fetch(`/api/getSignedURL`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isLogin: authStore.isLogin,
        fileName: file.value.name,
        fileType: file.value.type,
        size: file.value.size,
        checksum,
      }),
    });
    if (response.failure !== undefined) {
      isSubmitProcessing.value = false;
      throw new Error(response.failure);
    }

    const url = response.success.url;

    const realURL = url.split("?")[0];

    projectStore.projectImages.push(realURL);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.value.type,
      },
      body: file.value,
    });
  } catch (e) {
    isSubmitProcessing.value = false;
    console.error(e);
    return;
  }
  
  try {
    await $fetch(`http://localhost:8080/api/v1/project/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostId: authStore.userInfo.id,
        title: projectStore.title,
        description: projectStore.description,
        statusId: 1,
        isGraduationProject: projectStore.isGraduationProject,
        school: projectStore.school,
        allowApplicantsNum: projectStore.allowApplicantsNum,
        projectImages: projectStore.projectImages,
        tags: projectStore.tags,
        requireSkills: projectStore.requireSkills,
      }),
    }).then((res) => {
      if (res === "Project created successfully") {
        isSubmitProcessing.value = false;
        toast.add({ title: "提案創建成功" });
      } else {
        // find the message from messageMap
        statusMessage.value = messageMap[res];
        isSubmitProcessing.value = false;
        messageType.value = "error";
        setTimeout(() => {
          statusMessage.value = "";
        }, 3000);
      }
    });
  } catch (e) {
    isSubmitProcessing.value = false;
    console.error(e);
    return;
  }
};
</script>
<template>
  <UModal color="gray" v-model="tagModalOpen">
    <div class="p-4 bg-black">
      <UInput
        class="mb-4 border border-zinc-500"
        color="white"
        variant="none"
        size="xl"
        placeholder="tag name..."
        @keyup.enter="projectStore.addTag(tagInputString)"
        v-model="tagInputString"
        maxlength="50"
      />
      <div class="w-full">
        <div
          class="flex items-start justify-start gap-2 w-full flex-wrap"
          v-if="projectStore.tags.length > 0"
        >
          <AppTag v-for="tag in projectStore.tags" :tagName="tag" color="violet">
            <button
              @click="projectStore.deleteTag(tag)"
              class="flex items-center justify-center w-3"
            >
              <Icon name="material-symbols:delete-forever" class="w-6 h-6" />
            </button>
          </AppTag>
        </div>
        <p
          v-else
          class="flex items-center gap-2 justify-center text-white/65 px-1"
        >
          <span>Press</span>
          <UKbd>Enter</UKbd>
          <span>to add tags</span>
        </p>
      </div>
    </div>
  </UModal>
  <div
    class="flex items-start justify-start px-3 py-3 gap-2 border border-dotted cursor-pointer border-white w-full flex-wrap"
    @click="tagModalOpen = true"
  >
    <AppTag
      v-if="projectStore.tags.length > 0"
      v-for="tag in projectStore.tags"
      color="violet"
      :tagName="tag"
    />
    <p v-else class="text-white/65 px-1">加入標籤...</p>
  </div>
  <label class="form-control w-full bg-primary-content rounded-none">
    <input
      v-model="projectStore.requireSkills"
      type="text"
      placeholder="所需技能"
      class="input w-full bg-black rounded-none border border-white border-dotted outline-none focus:outline-none focus:border-white focus:border-dotted"
    />
  </label>
  <label class="form-control w-full bg-primary-content rounded-none">
    <input
      v-model="projectStore.title"
      type="text"
      placeholder="標題"
      class="input w-full bg-black rounded-none border border-white border-dotted outline-none focus:outline-none focus:border-white focus:border-dotted"
    />
  </label>
  <div class="w-full flex items-center justify-start">
    <label class="label gap-2 flex justify-start items-center">
      <span class="label-text text-white">需求人數</span>
      <input
        @change="
          (e) => {
            e.preventDefault();
            if (e.target.value < 1) {
              e.target.value = 1;
            }
            projectStore.allowApplicantsNum = e.target.value;
          }
        "
        :value="projectStore.allowApplicantsNum"
        type="number"
        min="1"
        class="flex items-center justify-center outline-none text-center w-2/5 bg-black py-2 border border-gray-500/30"
      />
    </label>
  </div>
  <div class="flex items-center justify-start w-full">
    <label class="label cursor-pointer gap-2">
      <span class="label-text text-white">畢業專題</span>
      <span class="text-sm">否</span>
      <input
        v-model="projectStore.isGraduationProject"
        type="checkbox"
        class="toggle"
        checked
      />
      <span class="text-sm">是</span>
    </label>
  </div>
  <label class="form-control w-full bg-primary-content rounded-none">
    <input
      v-model="projectStore.school"
      type="text"
      placeholder="學校"
      class="input w-full bg-black rounded-none border border-white border-dotted outline-none focus:outline-none focus:border-white focus:border-dotted"
    />
  </label>
  <textarea
    v-model="projectStore.description"
    class="w-full h-40 bg-black rounded-none textarea border border-white border-dotted outline-none focus:outline-none focus:border-white focus:border-dotted"
    placeholder="說明 ..."
  ></textarea>
  <div
    class="px-30 py-10 bg-violet-400/50 flex flex-col items-center justify-center w-full"
  >
    <Icon name="material-symbols:upload-file" class="w-12 h-12 mb-5" />
    <p class="font-semibold text-lg mb-5">Allow content: jpeg, png</p>
    <input
      type="file"
      @change="handleFileChange"
      class="file-input file-input-bordered w-full max-w-xs bg-violet-400"
      accept="image/jpeg, image/png"
    />
  </div>
  <FilePreviewer v-if="file" :previewURL="previewUrl" :fileName="file.name" />
  <StatusMessage
    v-if="statusMessage"
    :message="statusMessage"
    :type="messageType"
  />
  <div class="w-full flex items-center justify-end">
    <UButton
      color="white"
      variant="solid"
      size="xl"
      @click="handleSubmit"
      :disabled="isSubmitProcessing"
      class="w-20 h-10 flex items-center justify-center"
    >
      <p v-if="!isSubmitProcessing">發布</p>
      <AppLoader v-else />
  </UButton>
  </div>
</template>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
