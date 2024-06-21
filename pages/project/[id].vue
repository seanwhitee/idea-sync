<script setup>
import { ref } from "vue";
import { useProjectStore } from "~/store/project";
import { useProjectPoolStore } from "~/store/projectPool";
import { useAuthStore } from "~/store/auth";
import { useCommentStore } from "~/store/comment";

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const authStore = useAuthStore();
const projectPoolStore = useProjectPoolStore();
const commentStore = useCommentStore();
const toast = useToast();

if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  router.push("/");
}

const avatarURL = ref("");
const username = ref("");
const email = ref("");

const applyButtonName = ref("")

// filter out the current project to display the recommanded
// projects which relate to current one
const filterProjects = computed(() => {
  return projectPoolStore.projects.filter(
    (project) => project.id !== parseInt(route.params.id)
  );
});

const getCommentChunks = async () => {
  try {
    await $fetch(
      `http://localhost:8080/api/v1/comment/getAllCommentChunks?projectId=${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      commentStore.commentChuncks = response;
    });

  } catch (e) {
    console.error(e);
    return;
  }
};

const getApplicants = async () => {
  try {
    await $fetch(
      `http://localhost:8080/api/v1/applicant/getApplicants?projectId=${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.includes(authStore.userInfo.id)) {
        applyButtonName.value = "取消申請";
      } else {
        applyButtonName.value = "申請";
      }
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};

const getProjectData = async () => {
  try {
    await $fetch(
      `http://localhost:8080/api/v1/project/getProjectById?id=${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        projectStore.hostId = response.hostUserId;
        projectStore.title = response.title;
        projectStore.description = response.description;
        projectStore.statusId = response.statusId;
        projectStore.isGraduationProject = response.graduationProject;
        projectStore.school = response.school;
        projectStore.allowApplicantsNum = response.allowApplicantsNum;
        projectStore.applicantCount = response.applicantCount;
        projectStore.projectImages = response.images;
        projectStore.tags = response.tags;
        projectStore.requireSkills = response.requireSkills;

        projectStore.createAt = formatDate(response.createAt);
      })
      .then(() => {
        getHostUserData();
      }).then(() => {
        getApplicants();
      }).then(() => {
        getCommentChunks();
      });
  } catch (e) {
    console.error(e);
    return;
  }
};
getProjectData();

const getHostUserData = async () => {
  try {
    await $fetch(`http://localhost:8080/api/v1/users/${projectStore.hostId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      avatarURL.value = response.avatarUrl;
      username.value = response.nickName;
      email.value = response.email;
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

const handleProjectApply = async () => {
  if (applyButtonName.value === "申請") {
    try {
      await $fetch(
        `http://localhost:8080/api/v1/applicant/addApplicant?projectId=${route.params.id}&userId=${authStore.userInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        switch (res) {
          case "User is already an applicant":
            toast.add({
              title: "此專案已經申請",
            });
            break;
          case "Applicant added successfully":
            toast.add({
              title: "申請成功，等待提案者審核",
            });
            projectStore.applicantCount += 1;
            applyButtonName.value = "取消申請";
            break;
          default:
            break;
        }
      });
    } catch (e) {
      console.error(e);
      return;
    }
  } else if (applyButtonName.value === "取消申請") {
    await $fetch(
      `http://localhost:8080/api/v1/applicant/deleteApplicant?projectId=${route.params.id}&userId=${authStore.userInfo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      switch (res) {
        case "Applicant deleted successfully":
          toast.add({
            title: "取消申請成功",
          });
          projectStore.applicantCount -= 1;
          applyButtonName.value = "申請";
          break;
        default:
          break;
      }
    });
  }
};
</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <div class="flex w-11/12 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-2">
    <div class="flex flex-col w-full md:w-7/12 lg:w-8/12 gap-6 items-start">
      <div class="flex flex-col items-start justify-center p-1">
        <h1 class="text-2xl font-bold">{{ projectStore.title }}</h1>
        <p class="text-xs font-extralight opacity-50">
          {{ projectStore.createAt }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <AvatarCard
          :avatarURL="avatarURL"
          :username="username"
          :email="email"
        />
        <button
          v-if="projectStore.hostId !== authStore.userInfo.id && 
          ((projectStore.statusId === 1 && authStore.userInfo.roleName === 'creator') ||
          (projectStore.statusId === 2 && authStore.userInfo.roleName === 'mentor'))"
          @click="handleProjectApply"
          class="flex items-center justify-center bg-white h-3/5 font-light text-sm px-6 py-4 
          text-black rounded-md"
          :class="applyButtonName === '申請' ? '' : 'text-red-500'"
        >
          {{ applyButtonName }}
        </button>
      </div>

      <div class="flex flex-col gap-1">
        <!-- school -->
        <div class="flex gap-3">
          <NuxtImg src="school-icon.png" alt="school-icon" class="w-5 h-5" />
          <p class="">{{ projectStore.school }}</p>
        </div>
        <!-- need num -->
        <p>需求人數：{{ projectStore.allowApplicantsNum }}</p>
        <!-- applied num -->
        <p>應徵人數：{{ projectStore.applicantCount }}</p>
      </div>

      <!-- require skills -->
      <div class="flex flex-col">
        <h2 class="font-bold text-lg">所需技能：</h2>
        <p class="opacity-80">{{ projectStore.requireSkills }}</p>
      </div>

      <!-- tags -->
      <div class="flex gap-1 flex-wrap">
        <div
          v-if="projectStore.isGraduationProject"
          class="flex h-fit text-start items-center justify-center shadow-blue-800/50 border font-light 
          border-blue-300 text-white px-2 rounded-lg gap-1 shadow-lg text-xs md:text-base"
        >
          畢業專題
        </div>
        <Tag v-for="tag in projectStore.tags" :key="tag" :tagName="tag" />
      </div>

      <div class="flex flex-col gap-2 mb-10">
        <h2 class="font-bold text-lg">提案說明：</h2>
        <p class="opacity-80">{{ projectStore.description }}</p>
      </div>
      <h2 class="font-bold text-lg">{{ commentStore.commentChuncks.length }} 則留言</h2>
      <div class="flex items-center justify-start gap-2 w-full">
        <NuxtImg 
          :src="authStore.userInfo.avatarUrl"
          alt="user-avatar"
          class="w-8 h-8 rounded-full border border-white"
        />
        <CommentInput 
          :userId="authStore.userInfo.id"
          :projectId="parseInt(route.params.id)"
        />
      </div>
      
      <CommentChunk
        v-for="chunk in commentStore.commentChuncks"
        :key="chunk.id"
        :formatDate="formatDate"
        :commentId="chunk.id"
        :avatarURL="chunk.avatarURL"
        :comment="chunk.text"
        :nickName="chunk.nickName"
        :date="formatDate(chunk.createAt)" 
        :userId="authStore.userInfo.id"
        :projectId="parseInt(route.params.id)"
        :children="chunk.children" 
        />
    </div>
    <div class="hidden md:flex lg:flex flex-col md:w-5/12 lg:w-4/12 gap-2">
      <ProjectCard
        v-for="project in filterProjects"
        @click="router.push(`/project/${project.id}`)"
        :key="project.id"
        :isGraduationProject="project.graduationProject"
        :title="project.title"
        :school="project.school"
        :allowApplicantsNum="project.allowApplicantsNum"
        :applicantCount="project.applicantCount"
        :tags="project.tags"
        :imageURL="project.images[0]"
      />
    </div>
  </div>
</template>
