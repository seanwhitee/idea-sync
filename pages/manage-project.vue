<script setup>
import ApplicantStatusBadge from "~/components/kanban/applicant-status-badge.vue";
import { useAuthStore } from "~/store/auth";
import { useProjectStore } from "~/store/project";

const projectStatus = [
  { name: "member_recruiting", statusId: 1 },
  { name: "mentor_recruiting", statusId: 2 },
  { name: "complete", statusId: 3 },
];

const columns = [
  {
    key: "nickName",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "status",
    label: "狀態",
  },
  {
    key: "actions",
    label: "審核",
  },
];

const tabs = [
  {
    label: "我的專案",
  },
  {
    label: "已申請",
  },
  {
    label: "已加入",
  },
];

const authStore = useAuthStore();
const projectStore = useProjectStore();
const toast = useToast();

// needs to be reactive because when kanban card status change,
// we need to move it to another column
const projects = ref([]);

// states for applicants manage modal
const openProjectStatusChangeModal = ref(false);
const openApplicantManageModal = ref(false);
const openApplicantConfirmModal = ref(false);
const nextStatus = ref(2);
const applicants = ref([]);
const modalProjectId = ref(-1);
const currentTab = ref("我的專案");
const projectInfo = ref({});
const applicantInfo = ref({});

if (!authStore.isLogin || !authStore.userInfo.roleVerified) {
  throw new Error("Not authenticated");
}
if (authStore.userInfo.roleName === "admin") {
  throw new Error("You cannot access this page");
}

onMounted(async () => {
  projects.value = await projectStore.getProjectByUserId(authStore.userInfo.id);
});

const rejectOrAccept = "";

const changeProjectStatus = async () => {
  const projectResponse = await projectStore.changeProjectStatus(
    modalProjectId.value,
    nextStatus.value
  );

  if (projectResponse) {
    projects.value = projects.value.map((project) => {
      if (project.id === projectResponse.id) {
        return projectResponse;
      } else {
        return project;
      }
    });
  }
};

const setOpenProjectStatusChangeModal = async (value, projectId) => {
  openProjectStatusChangeModal.value = value;
  modalProjectId.value = projectId;

  // get project info
  projectInfo.value = await projectStore.getProjectById(projectId);
  applicants.value = projectInfo.value.applicants.map((applicant) => {
    const { id, nickName, email } = applicant.user;
    const status = applicant.status;
    return { id, nickName, email, status };
  });

  const projectStatus = projectInfo.value.statusId;
  nextStatus.value = projectStatus === 1 ? 2 : 3;
};

const setOpenApplicantManageModal = async (value, projectId) => {
  // set modal to open
  openApplicantManageModal.value = value;
  modalProjectId.value = projectId;

  // get project info
  projectInfo.value = await projectStore.getProjectById(projectId);

  applicants.value = projectInfo.value.applicants.map((applicant) => {
    const { id, nickName, email } = applicant.user;
    const status = applicant.status;
    return { id, nickName, email, status };
  });
};

const findApplicantInfo = (applicatId) => {
  applicantInfo.value = applicants.value.find((applicant) => {
    return applicant.id === applicatId;
  });
  return applicantInfo.value;
};

const onTabChange = (index) => {
  const tab = tabs[index];
  currentTab.value = tab.label;
};

const countAccepted = computed(() => {
  return applicants.value.filter((applicant) => applicant.status === 1).length;
});

const applicantAccept = async () => {
  const res = await projectStore.acceptApplicant(
    modalProjectId.value,
    applicantInfo.value.id
  );

  if (!res) {
    toast.add({ title: `接受 ${res.user.nickName} 之申請失敗` });
  } else {
    toast.add({ title: `接受 ${res.user.nickName} 之申請成功` });
    applicants.value = applicants.value.map((applicant) => {
      if (applicant.id === res.user.id) {
        const { id, nickName, email } = res.user;
        const status = res.status;
        return { id, nickName, email, status };
      }
      return applicant;
    });
  }
  openApplicantConfirmModal.value = false;
};

const allowChangeStatus = computed(() => {
  return (
    (projectInfo.value.statusId === 1 &&
      projectInfo.value.allowApplicantsNum >= countAccepted.value &&
      applicants.value.every((applicant) => applicant.status !== 0)) ||
    (projectInfo.value.statusId === 2 &&
      countAccepted.value === 1 &&
      applicants.value.every((applicant) => applicant.status !== 0))
  );
});

const applicantReject = async () => {
  const res = await projectStore.rejectApplicant(
    modalProjectId.value,
    applicantInfo.value.id
  );

  if (!res) {
    toast.add({ title: `拒絕 ${res.user.nickName} 申請失敗` });
  } else {
    toast.add({ title: `拒絕 ${res.user.nickName} 申請成功` });
    applicants.value = applicants.value.map((applicant) => {
      if (applicant.id === res.user.id) {
        const { id, nickName, email } = res.user;
        const status = res.status;
        return { id, nickName, email, status };
      }
      return applicant;
    });
  }
  openApplicantConfirmModal.value = false;
};
</script>
<template>
  <!--change status model-->
  <UModal v-model="openProjectStatusChangeModal">
    <div v-if="allowChangeStatus === true" class="p-10">
      <h4 class="font-bold text-2xl mb-2">變更專案狀態</h4>
      <p class="text-zinc-500 text-sm mb-10">
        確認將專案狀態變更為{{ nextStatus === 2 ? "指導者招募" : "完成招募" }}?
      </p>
      <UButton
        @click="changeProjectStatus(), (openProjectStatusChangeModal = false)"
        >確認變更</UButton
      >
    </div>
    <div v-else class="p-10">
      <h4 class="font-bold text-2xl mb-2">無法變更專案狀態</h4>
      <p class="text-zinc-500 text-sm">
        1. 如果為成員招募：請確認申請者都已審核完成
      </p>
      <p class="text-zinc-500 text-sm mb-10">
        2. 如果為指導者招募：請確認已找到一位指導者&申請者都已審核完成
      </p>
    </div>
  </UModal>

  <!--applicant manage confirm modal-->
  <UModal v-model="openApplicantConfirmModal">
    <div class="p-10">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-2xl mb-2">
          確認{{ rejectOrAccept }}{{ applicantInfo.nickName }}
        </h4>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="openApplicantConfirmModal = false"
        />
      </div>
      <p class="text-zinc-500 text-sm mb-10">按下確認將不得再次修改此筆申請</p>
      <UButton
        @click="
          rejectOrAccept === '接受' ? applicantAccept() : applicantReject()
        "
        >確認{{ rejectOrAccept }}</UButton
      >
    </div>
  </UModal>

  <!--applicant manage modal-->
  <UModal v-model="openApplicantManageModal" prevent-close>
    <div class="p-10">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-2xl mb-2">申請者</h4>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="openApplicantManageModal = false"
        />
      </div>
      <p class="text-zinc-500 text-sm mb-10">接受或拒絕申請者加入專案</p>
      <!--get require and accept-->
      <div class="flex w-full gap-4 mb-6 text-zinc-500">
        <UContainer class="border w-1/2 border-zinc-800 px-4 py-6 rounded-xl"
          >需求人數<span class="text-white ps-2 text-xl font-mono">{{
            projectInfo.statusId === 1 ? projectInfo.allowApplicantsNum : 1
          }}</span>
        </UContainer>
        <UContainer
          class="border w-1/2 border-green-800/50 px-4 py-6 rounded-xl"
          >錄取人數<span class="text-white ps-2 text-xl font-mono">{{
            countAccepted
          }}</span></UContainer
        >
      </div>
      <UTable
        :columns="columns"
        :rows="applicants"
        class="border border-zinc-500/50"
      >
        <template #status-data="{ row }">
          <ApplicantStatusBadge :applicantStatus="row.status" />
        </template>
        <template #actions-data="{ row }">
          <div class="flex items-center gap-3" v-if="row.status === 0">
            <button
              v-if="
                (projectInfo.statusId === 1 &&
                  projectInfo.allowApplicantsNum > countAccepted) ||
                (projectInfo.statusId === 2 && countAccepted < 1)
              "
              @click="
                (openApplicantConfirmModal = true),
                  (rejectOrAccept = '接受'),
                  (applicantInfo = findApplicantInfo(row.id))
              "
              class="bg-white shadow-lg px-2 py-0.5 rounded-md text-xs text-green-800 border border-green-800"
            >
              接受
            </button>
            <button
              @click="
                (openApplicantConfirmModal = true),
                  (rejectOrAccept = '拒絕'),
                  (applicantInfo = findApplicantInfo(row.id))
              "
              class="bg-white shadow-lg px-2 py-0.5 rounded-md text-xs text-red-800 border border-red-800"
            >
              拒絕
            </button>
          </div>
          <Tag v-else tag-name="已審核" color="indigo" />
        </template>
      </UTable>
    </div>
  </UModal>

  <LoginedNavbar />
  <Sidebar />
  <div class="pt-28 mx-3">
    <UTabs :items="tabs" @change="onTabChange" class="mb-4" />
    <!--kanban-->
    <div
      v-if="currentTab === '我的專案'"
      class="flex-col flex md:flex-row items-center w-full gap-4 px-4 overflow-auto py-10 bg-zinc-900"
    >
      <KanbanColumn
        :title="s.name.split('_').join(' ')"
        v-for="s in projectStatus"
        :key="s.statusId"
      >
        <KanbanCard
          v-for="p in projects.filter((p) => p.statusId === s.statusId)"
          :key="p.id"
          :projectId="p.id"
          :status="p.statusId"
          :title="p.title"
          :text="p.description"
          :openApplicantManageModal="setOpenApplicantManageModal"
          :openProjectStatusChangeModal="setOpenProjectStatusChangeModal"
        />
      </KanbanColumn>
    </div>
  </div>
</template>
