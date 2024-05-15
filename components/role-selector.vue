<script setup>
const props = defineProps({
  updateRole: Function,
});
const role = ref("creator");
const handleRoleButtonClick = (role) => {
  props.updateRole(role);
  if (role === "creator") {
    return "學生";
  } else if (role === "mentor") {
    return "指導者";
  }
};
</script>
<template>
  <!--select type input to determine if user status is creator or mentor-->
  <div class="flex content-evenly mb-5">
    <p class="content-center text-sm font-extrali.ght">身份：</p>
    <div class="dropdown dropdown-hover dropdown-right">
      <div tabindex="0" class="btn m-1 glass">
        {{handleRoleButtonClick(role)}}
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li @click="role = 'creator'"><a>學生</a></li>
        <li @click="role = 'mentor'"><a>指導者</a></li>
      </ul>
    </div>
  </div>
</template>
