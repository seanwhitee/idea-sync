<script setup>
import ApplicantStatusBadge from "~/components/kanban/applicant-status-badge.vue";
import { useAuthStore } from "~/store/auth";
import { useProjectStore } from "~/store/project";
definePageMeta({
  colorMode: "dark",
});

const manageAppliedTableColumns = [
  {
    key: "title",
    label: "專案名稱",
  },
  {
    key: "host",
    label: "提案人",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "projectStatus",
    label: "專案狀態",
  },
  {
    key: "applicantStatus",
    label: "申請狀態",
  },
];
const authStore = useAuthStore();
const projectStore = useProjectStore();
const router = useRouter();
const projects = ref([]);

if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  throw new Error("Not authenticated");
}
if (authStore.userInfo.roleName === "admin") {
  throw new Error("You cannot access this page");
}

onMounted(async () => {
  projects.value = await projectStore.getProjectAppliedByUser(authStore.userInfo.id);
});

const getProjectAppliedTableData = computed(() => {
  return projects.value.map((p) => {
    const applicant = p.applicants.find((applicant) => {
      return applicant.user.id === authStore.userInfo.id;
    });

    if (!applicant) {
      return {
        id: null,
        title: "",
        host: "",
        email: "",
        projectStatus: null,
        applicantStatus: null,
      };
    }

    return {
      id: p.id,
      title: p.title,
      host: p.hostUser.nickName,
      email: p.hostUser.email,
      projectStatus: p.statusId,
      applicantStatus: applicant.status,
    };
  });
});
</script>
<template>
  <UTable
    :columns="manageAppliedTableColumns"
    :rows="getProjectAppliedTableData"
    class="bg-white dark:bg-black w-full border border-zinc-500/50 px-1 rounded-md"
  >
    <template #title-data="{ row }">
      <p class="cursor-pointer" @click="router.push(`/Platform/project/${row.id}`)">
        {{
          row.title.length > 30 ? row.title.slice(0, 30) + "..." : row.title
        }}
      </p>
    </template>
    <template #projectStatus-data="{ row }">
      <Tag v-if="row.projectStatus === 1" color="slate" tag-name="成員招募" />
      <Tag
        v-if="row.projectStatus === 2"
        color="slate"
        tag-name="指導者招募"
      />
      <Tag v-if="row.projectStatus === 3" color="slate" tag-name="完成招募" />
    </template>
    <template #applicantStatus-data="{ row }">
      <ApplicantStatusBadge :applicant-status="row.applicantStatus" />
    </template>
  </UTable>
</template>
