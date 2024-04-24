<script setup>
const props = defineProps({
	updateRole: Function,
	handleRoleButtonClick: Function,
	userRole: String,
});

</script>
<template>
  <!--select type input to determine if user status is creator or mentor-->
  <div class="flex content-evenly mb-10">
    <p class="content-center text-sm font-extrali.ght">身份：</p>
    <div class="dropdown dropdown-hover dropdown-bottom">
      <div tabindex="0" class="btn m-1 glass">
        {{ props.handleRoleButtonClick(props.userRole) }}
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li @click="props.updateRole('creator')"><a>提案/申請者</a></li>
        <li @click="props.updateRole('mentor')"><a>指導者</a></li>
      </ul>
    </div>
  </div>
</template>
