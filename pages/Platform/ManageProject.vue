<script setup>
const tabs = [
  {
    label: "我的專案",
  },
  {
    label: "已申請",
  },
];
const router = useRouter();
const currentTab = ref("我的專案");
router.push("/Platform/ManageProject/MyProject");
const onTabChange = async (index) => {
  const tab = tabs[index];
  currentTab.value = tab.label;
  if (currentTab.value === "我的專案") {
    router.push("/Platform/ManageProject/MyProject");
  } else if (currentTab.value === "已申請") {
    router.push("/Platform/ManageProject/AppliedProject");
  }
};
</script>
<template>
  <div class="w-full">
    <UTabs :items="tabs" @change="onTabChange" class="mb-4" />
    <NuxtPage />
  </div>
</template>