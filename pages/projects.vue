<script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
const isLogin = authStore.isLogin;
const router = useRouter();

if (!isLogin || !authStore.userInfo.roleVerified) {
    router.push("/")
}
</script>
<template class="text-white">
    <LoginedNavbar />
    <Sidebar />

    
</template>