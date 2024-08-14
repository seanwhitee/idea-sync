<script setup>
const props = defineProps({
  projectId: Number,
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
    <div class="w-full flex justify-end p-4">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class=""
        @click="isSlideOverOpen = false"
      />
    </div>
    <div class="px-6 flex-1 flex-col">
      <h3 class="text-2xl font-bold mb-6 text-zinc-300">
        {{ projectDetail.title }}
      </h3>

      <p class="text-sm font-bold mb-2">{{ "指導者" }}</p>
      <AvatarCard
        :avatarURL="teamPeoples.mentors[0].avatarUrl"
        :username="teamPeoples.mentors[0].nickName"
        :email="teamPeoples.mentors[0].email"
        class="mb-6 borde w-fit py-1 pe-4 px-2 bg-zinc-800 rounded-md"
      />
      <h4 class="text-sm font-bold mb-1">{{ "所需技能" }}</h4>
      <p class="mb-4 text-zinc-500">
        {{
          projectDetail.requireSkills.length > 100
            ? projectDetail.requireSkills.slice(0, 100) + "..."
            : projectDetail.requireSkills
        }}
      </p>
      <h4 class="text-sm font-bold mb-2">{{ "團隊成員" }}</h4>
      <UTable
        :rows="teamPeoples.members"
        :columns="memberTableColumn"
        class="h-[425px] overflow-scroll border-zinc-800 border rounded-md"
      />
    </div>
  </USlideover>
</template>
