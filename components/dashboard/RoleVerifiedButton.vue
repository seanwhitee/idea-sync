<script setup>

const props = defineProps({
  roleName: String,
  userId: Number,
  nickName: String,
});
const router = useRouter();
const updateRoleStatus = async (userId, status) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/users/updateRoleStatus?id=${userId}&status=${status}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // refresh current page '/admin-dashboard'
  router.go();
};
</script>
<template>
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn" onclick="my_modal_1.showModal()">批准</button>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box font-light">
      <p>確認核實 {{ props.nickName }} 的使用者身份</p>
      <p class="">身份：{{ props.roleName }}</p>
      <div class="modal-action">
        <form method="dialog" class="flex gap-2">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn" @click="updateRoleStatus(props.userId, true)">確認</button>
          <button class="btn">取消</button>
        </form>
      </div>
      
    </div>
  </dialog>
</template>
