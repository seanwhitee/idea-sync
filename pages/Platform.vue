<script setup>
const router = useRouter();
router.push("/Platform/projects");
</script>
<template>
  <LoginedNavbar />
  <Sidebar />
  <div class="flex flex-col items-center w-11/12 md:w-4/5 lg:w-4/5 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-4">
    <NuxtPage />
  </div>
</template>
