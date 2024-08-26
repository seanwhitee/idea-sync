<script setup>
const props = defineProps({
  projectId: String,
});
const isSettingOpen = defineModel();
</script>

<template>
  <USlideover prevent-close v-model="isSettingOpen">
    <div class="flex justify-end w-full p-4">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class=""
        @click="isSettingOpen = false"
      />
    </div>
    <div class="flex-col flex-1 px-6">
      <h3 class="mb-6 text-2xl font-bold text-zinc-300">專案設定</h3>
    </div>
  </USlideover>
</template>
