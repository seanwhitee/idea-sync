<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useProjectStore } from '~/store/project';
import { useProjectPoolStore } from '~/store/projectPool';
import { useCommentStore } from '~/store/comment';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const projectStore = useProjectStore();
const commentStore = useCommentStore();
const toast = useToast();

if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  router.push('/');
}

const avatarURL = ref('');
const username = ref('');
const email = ref('');
const applyButtonName = ref('申請');

/**
 * TODO: change projectPoolStore.projects to projectStore.relatedProjects state.
 */

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};

// main fetch function to get current project info and its related data
// like applied users, etc.
const fetchProjectData = async () => {
  try {
    await $fetch(
      `http://localhost:8080/api/v1/project/getProjectById?id=${route.params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response)=>{
      projectStore.hostId = response.hostUser.id;
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
      commentStore.commentChuncks = response.commentChunks;
      projectStore.applicants = response.applicants
      if (projectStore.applicants.find((user) => user.id === authStore.userInfo.id)) {
        applyButtonName.value = '取消申請';
      }

      avatarURL.value = response.hostUser.avatarUrl;
      username.value = response.hostUser.nickName;
      email.value = response.hostUser.email;
      
    }).then(()=>{
      const currProjectId = route.params.id;
      projectStore.getRelatedProjects(currProjectId);
    })
  } catch (e) {
    console.error(e);
  }
};

// Fetch project data on first page load using useAsyncData
const { data, error } = useAsyncData('projectData', fetchProjectData);

const handleProjectApply = async () => {
  if (applyButtonName.value === '申請') {
    try {
      const res = await $fetch(
        `http://localhost:8080/api/v1/applicant/addApplicant?projectId=${route.params.id}&userId=${authStore.userInfo.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      switch (res) {
        case 'User is already an applicant':
          toast.add({
            title: '此專案已經申請',
          });
          break;
        case 'Applicant added successfully':
          toast.add({
            title: '申請送出，等待審核',
          });
          projectStore.applicantCount += 1;
          projectStore.applicants.push(authStore.userInfo);
          applyButtonName.value = '取消申請';
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  } else if (applyButtonName.value === '取消申請') {
    try {
      const res = await $fetch(
        `http://localhost:8080/api/v1/applicant/deleteApplicant?projectId=${route.params.id}&userId=${authStore.userInfo.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      switch (res) {
        case 'Applicant deleted successfully':
          toast.add({
            title: '取消申請成功',
          });
          projectStore.applicantCount -= 1;
          projectStore.applicants.splice(
            projectStore.applicants.findIndex((user) => user.id === authStore.userInfo.id),
            1
          );
          applyButtonName.value = '申請';
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <div class="flex w-11/12 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-2">
    <div class="flex flex-col w-full md:w-7/12 lg:w-8/12 gap-6 items-start">
      <ProjectStatusVisualizer :statusId="projectStore.statusId" />
      <div class="flex flex-col items-start justify-center p-1">
        <NuxtImg
          :src="projectStore.projectImages[0]"
          alt="project-image"
          class="w-14 h-14 rounded-md flex" />
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
          ((projectStore.statusId === 1 && 
          authStore.userInfo.roleName === 'creator' && 
          authStore.userInfo.allowProjectApply) || (
          projectStore.statusId === 2 && 
          authStore.userInfo.roleName === 'mentor' && 
          authStore.userInfo.allowProjectApply))"
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
        <p>申請人數：{{ projectStore.applicantCount }}</p>
      </div>

      <!-- require skills -->
      <div class="flex flex-col">
        <h2 class="font-bold text-lg">所需技能：</h2>
        <p class="opacity-80">{{ projectStore.requireSkills }}</p>
      </div>

      <!-- tags -->
      <div class="flex gap-1 flex-wrap">
        <Tag v-if="projectStore.isGraduationProject" 
          tagName="畢業專題" 
          color="indigo"  />
        <Tag v-for="tag in projectStore.tags" 
          :key="tag" 
          :tagName="tag"
          color="violet" />
      </div>

      <div class="flex flex-col gap-2 mb-10">
        <h2 class="font-bold text-lg">提案說明：</h2>
        <p class="opacity-80">{{ projectStore.description }}</p>
      </div>
      <h2 class="font-bold text-lg">{{ commentStore.commentChuncks.length }} 則留言</h2>
      <div class="flex items-start justify-start gap-2 w-full">
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
        v-for="project in projectStore.relatedProjects"
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
