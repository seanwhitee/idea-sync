<script setup>
const props = defineProps({
  projectId: String,
});
const memberTableColumn = [
  {
    key: "nickName",
    label: "使用者",
  },
  {
    key: "email",
    label: "Email",
  },
];
const projectDetail = ref({});

onMounted(async () => {
  projectDetail.value = await $fetch(
    "http://localhost:8080/api/v1/project/getProjectById",
    {
      params: {
        id: props.projectId,
      },
    }
  );
});

const teamPeoples = computed(() => {
  const applicants = projectDetail.value.applicants;
  if (!applicants) {
    return;
  }
  return {
    mentors: applicants
      .map((a) => (a.user.roleName === "mentor" ? a.user : null))
      .filter((user) => user),
    members: applicants
      .map((a) => (a.user.roleName === "creator" ? a.user : null))
      .filter((user) => user),
  };
});

const isSlideOverOpen = defineModel();
</script>

<template>
  <USlideover prevent-close v-model="isSlideOverOpen">
    <div class="pb-4 overflow-y-scroll">
      <div class="flex justify-end w-full p-4">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class=""
          @click="isSlideOverOpen = false"
        />
      </div>
      <div class="flex-col flex-1 px-6">
        <h3 class="mb-6 text-2xl font-bold text-zinc-300">
          {{ projectDetail.title }}
        </h3>

        <p class="mb-3 text-sm font-bold text-white">{{ "指導者" }}</p>
        <AvatarCard
          :avatarURL="teamPeoples.mentors[0].avatarUrl"
          :username="teamPeoples.mentors[0].nickName"
          :email="teamPeoples.mentors[0].email"
          class="px-2 py-1 mb-6 rounded-md borde w-fit pe-4 bg-zinc-800"
        />
        <h4 class="mb-3 text-sm font-bold text-white">{{ "所需技能" }}</h4>
        <p class="mb-6 text-zinc-500">
          {{
            projectDetail.requireSkills.length > 100
              ? projectDetail.requireSkills.slice(0, 100) + "..."
              : projectDetail.requireSkills
          }}
        </p>
        <h4 class="mb-3 text-sm font-bold text-white">{{ "團隊成員" }}</h4>
        <UTable
          :rows="teamPeoples.members"
          :columns="memberTableColumn"
          class="h-[425px] overflow-scroll border-zinc-800 border rounded-md"
        >
          <template #nickName-data="{ row }">
            <NuxtLink :to="'/app-platform/user-profile/' + row.id">
              {{ row.nickName }}</NuxtLink
            >
          </template>
        </UTable>
      </div>
    </div>
  </USlideover>
</template>
