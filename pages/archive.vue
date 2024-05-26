<script setup>
import { useAuthStore } from '~/store/auth';
import { useProjectPoolStore } from '~/store/projectPool';

const router = useRouter();
const authStore = useAuthStore();
const projectPoolStore = useProjectPoolStore();

if (!authStore.isLogin || authStore.userInfo.roleName === 'admin' ) {
  router.push('/')
}

</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <div class="flex flex-col items-center w-11/12 md:w-4/5 lg:w-4/5 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-4">
    <ProjectPost v-for="project in projectPoolStore.projects.filter(project => projectPoolStore.archiveProjects.includes(project.id))" 
    :key="project.id" 
    :project="project" />
  </div>
</template>