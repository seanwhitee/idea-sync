<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

if (!isLogin || !authStore.userInfo.roleVerified) {
  throw new Error('Not authorized');
}
if (authStore.userInfo.roleName !== "admin") {
  throw new Error('You cannot access this page');
}
</script>
<template>


</template>