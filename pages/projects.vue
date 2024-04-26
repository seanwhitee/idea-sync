<script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
const isLogin = authStore.isLogin;
const router = useRouter();
// if user not login, redirect to landing page for route protection
if (!isLogin) {
    router.push("/")
}

const logout = () => {
    authStore.logout();
    router.push("/");
}

const data = useAuthStore().userInfo
</script>
<template class="text-white">
    {{ data }}

    <button @click="logout" class="text-white bg-zinc-800 px-3 py-3 rounded-lg">logout</button>
</template>