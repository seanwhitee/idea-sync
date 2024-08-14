<script setup>
import { useProjectPoolStore } from "~/store/projectPool";
import { useAuthStore } from "~/store/auth";
const projectPoolStore = useProjectPoolStore();
const authStore = useAuthStore();
const toast = useToast();
const props = defineProps({
  project: Object,
});
const addToArchive = async () => {
  try {
    const response = await $fetch(
      `http://localhost:8080/api/v1/archive/addArchive?projectId=${props.project.id}&userId=${authStore.userInfo.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    switch (response) {
      case "Archive added successfully":
        toast.add({
          title: "收納成功",
        });
        projectPoolStore.archives.push(props.project);
        break;

      default:
        break;
    }
  } catch (e) {
    console.error(e);
    return;
  }
};
const deleteFromArchive = async () => {
  try {
    const response = await $fetch(
      `http://localhost:8080/api/v1/archive/deleteArchive?projectId=${props.project.id}&userId=${authStore.userInfo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    switch (response) {
      case "Archive deleted successfully":
        toast.add({
          title: "已移出收納",
        });
        projectPoolStore.archives =
          projectPoolStore.archives.filter(
            (archive) => archive.id !== props.project.id
          );
        break;
      default:
        break;
    }
  } catch (e) {
    console.error(e);
    return;
  }
};
const checkIfArchiveProjectExist = (id) => {
  return projectPoolStore.archives.filter((archive) => archive.id === id).length > 0;
};
</script>
<template>
  <Icon
    name="material-symbols:bookmark-remove-sharp"
    class="w-6 h-6"
    @click="deleteFromArchive"
    v-if="checkIfArchiveProjectExist(props.project.id)"
  />
  <Icon
    name="material-symbols:bookmark-add-outline-sharp"
    class="w-6 h-6"
    @click="addToArchive"
    v-if="!checkIfArchiveProjectExist(props.project.id)"
  />
</template>
