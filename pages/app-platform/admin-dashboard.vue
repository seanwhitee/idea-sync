<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { useAdminStore } from "~/store/admin";

const authStore = useAuthStore();
const adminStore = useAdminStore();
const router = useRouter();
const getUsers = async () => {
  const users = await $fetch("http://localhost:8080/api/v1/users/getAllUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    adminStore.userList = res;
  });
};
if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  router.push("/");
}

if (authStore.userInfo.roleName !== "admin") {
  router.push("/app-platform/projects");
}

getUsers();
</script>
<template>
  <div class="text-white pt-36 pb-20">
    <div v-for="user in adminStore.userList">
      <div class="flex justify-between">
        <div class="flex items-center justify-center gap-3">
          <DashboardRoleVerifiedButton
            v-if="!user.roleVerified"
            :roleName="user.roleName"
            :userId="user.id"
            :nickName="user.nickName"
          />
          <DashboardDeleteUserButton
            :userId="user.id"
            :nickName="user.nickName"
          />
          <p>{{ user.roleVerified }}</p>
          <p>{{ user.nickName }}</p>
          <p>{{ user.email }}</p>
          <p>{{ user.roleName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
