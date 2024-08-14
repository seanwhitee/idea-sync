<script setup>
import CompleteRecruitSlideOver from './CompleteRecruitSlideOver.vue';

const props = defineProps({
  projectId: Number,
  status: Number,
  title: String,
  text: String,
  openApplicantManageModal: Function,
  openProjectStatusChangeModal: Function,
});
const isSlideOverOpen = ref(false);
const items = [
  [
    {
      label: "管理申請者",
      click: () => {
        props.openApplicantManageModal(true, props.projectId);
      },
      disabled: props.status === 3,
    },
    {
      label: "切換狀態",
      click: () => {
        props.openProjectStatusChangeModal(true, props.projectId);
      },
    },
    {
      label: "團隊成員",
      click: () => {
        isSlideOverOpen.value = true;
      },
      disabled: props.status !== 3
    },
  ],
];
const router = useRouter();
</script>
<template>
  <CompleteRecruitSlideOver
    v-model="isSlideOverOpen"
    :projectId="props.projectId"
  />
  <div
    class="flex flex-col w-full p-3 items-center bg-zinc-900 justify-center border border-zinc-500/40"
  >
    <h3 class="flex items-start justify-between w-full gap-2 mb-2 h-[24px] overflow-y-hidden">
      <span
        @click="router.push(`/Platform/project/${props.projectId}`)"
        class="w-full cursor-pointer"
        >{{ props.title }}</span
      >
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <div>
          <Icon name="ph:dots-three-outline-fill" />
        </div>
      </UDropdown>
    </h3>
    <p class="w-full h-10 text-xs text-white/50 overflow-hidden">
      {{ props.text }}
    </p>
  </div>
</template>
