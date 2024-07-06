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
}

const router = useRouter();
const toast = useToast();

// 1. check if the user is login and role is verified
// 2. check if the user role is creator
// if not, redirect to home page
const authStore = useAuthStore();
const projectStore = useProjectStore();
if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  router.push("/");
}

if (authStore.userInfo.roleName !== "creator") {
  router.push("/projects");
}

// clear project store data
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

const isValidInputData = (title, description, school, requireSkills, tags, file) => {

  // check if the title, description, school is empty
  if (!title || !description || !school || !file || !requireSkills || tags.length === 0) {
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
}

const handleSubmit = async () => {
  isSubmitProcessing.value = true;

  // ** upload image to exchange the real url **

  // check if the input data is valid
  if(!isValidInputData(projectStore.title, 
  projectStore.description, 
  projectStore.school, 
  projectStore.requireSkills, 
  projectStore.tags,
  file.value)) {
    isSubmitProcessing.value = false;
    return;
  }

  // check if isAllowProjectCreate is true
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

    // extract the real url from signed url
    const realURL = url.split("?")[0];

    projectStore.projectImages.push(realURL);

    // upload file to s3
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

  // ** save project to database **
  try {
    await $fetch(
      `http://localhost:8080/api/v1/project/create`,
      {
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
          applicantCount: 0,
          projectImages: projectStore.projectImages,
          tags: projectStore.tags,
          requireSkills: projectStore.requireSkills,
        }),
      }
    ).then((res) => {
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
  <LoginedNavbar />
  <Sidebar />
  <div
    class="flex flex-col items-center w-11/12 md:w-3/5 lg:w-3/5 pt-28 md:pt-36 lg:pt-36 pb-20 mx-auto gap-4"
  >
    <TagContainer />
    <!--require skills-->
    <label class="form-control w-full bg-primary-content rounded-none">
      <input
        v-model="projectStore.requireSkills"
        type="text"
        placeholder="所需技能"
        class="input w-full bg-black rounded-none border border-white border-dotted outline-none focus:outline-none
        focus:border-white focus:border-dotted"
      />
    </label>
    <!--title-->
    <label class="form-control w-full bg-primary-content rounded-none">
      <input
        v-model="projectStore.title"
        type="text"
        placeholder="標題"
        class="input w-full bg-black rounded-none border border-white border-dotted outline-none focus:outline-none
        focus:border-white focus:border-dotted"
      />
    </label>

    <!--allow applcant num-->
    <div class="w-full flex items-center justify-start">
      <label class="label gap-2 flex justify-start items-center">
        <span class="label-text">需求人數</span>
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

    <!--is graduation project-->
    <div class="flex items-center justify-start w-full">
      <label class="label cursor-pointer gap-2">
        <span class="label-text">畢業專題</span>
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

    <!--school-->
    <label class="form-control w-full bg-primary-content rounded-none">
      <input
        v-model="projectStore.school"
        type="text"
        placeholder="學校"
        class="input w-full bg-black rounded-none border border-white border-dotted outline-none focus:outline-none
        focus:border-white focus:border-dotted" 
      />
    </label>

    <!--description-->
    <textarea
      v-model="projectStore.description"
      class="w-full h-40 bg-black rounded-none textarea border border-white border-dotted outline-none focus:outline-none
      focus:border-white focus:border-dotted"
      placeholder="說明 ..."
    ></textarea>

    <!--image upload-->
    <div
      class="px-30 py-10 bg-violet-400/50 flex flex-col items-center justify-center w-full"
    >
      <NuxtImg src="upload.png" alt="upload" class="w-12 mb-5" />
      <p class="font-semibold text-lg mb-5">Allow content: jpeg, png</p>
      <input
        type="file"
        @change="handleFileChange"
        class="file-input file-input-bordered w-full max-w-xs bg-violet-400"
        accept="image/jpeg, image/png"
      />
    </div>

    <!--preview upload-->
    <FilePreviewer v-if="file" :previewURL="previewUrl" :fileName="file.name" />

    <!--submit button-->
    <StatusMessage
      v-if="statusMessage"
      :message="statusMessage"
      :type="messageType"
    />
    <div class="w-full flex items-center justify-end">
      <button
        class="hover:bg-zinc-800/50 px-10 border border-gray-600 py-2 text-sm bg-zinc-950 text-white"
        @click="handleSubmit"
        :disabled="isSubmitProcessing"
      >
        <p v-if="!isSubmitProcessing">發布</p>
        <Loader v-else />
      </button>
    </div>
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