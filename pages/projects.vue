<script setup>
import { useAuthStore } from "~/store/auth";
import { useSearchStore } from "~/store/searchbar";
import { useProjectPoolStore } from "~/store/projectPool";
const authStore = useAuthStore();
const searchStore = useSearchStore();
const projectPoolStore = useProjectPoolStore();
const isLogin = authStore.isLogin;
const router = useRouter();

if (!isLogin || !authStore.userInfo.roleVerified) {
	router.push("/");
}
</script>
<template>
	<LoginedNavbar />
	
	<Sidebar />
	<div class="flex flex-col items-center w-11/12 md:w-4/5 lg:w-4/5 pt-28 md:pt-24 lg:pt-24 pb-20 mx-auto gap-4">
		

			<div class="flex justify-between px-4 py-2 my-4 w-full border border-zinc-800">
				<button class="flex justify-center px-4 py-2 w-1/2 ease-linear duration-200"
				:class="{ 'bg-zinc-800': projectPoolStore.selectedGroup === 'member_recruiting' }"
				@click="projectPoolStore.selectedGroup = 'member_recruiting'"
				>
					<p class="text-white text-lg">學生招募</p>
				</button>
				<button class="flex justify-center px-4 py-2 w-1/2 ease-linear duration-200"
				:class="{ 'bg-zinc-800': projectPoolStore.selectedGroup === 'mentor_recruiting' }"
				@click="projectPoolStore.selectedGroup = 'mentor_recruiting'"
				>
					<p class="text-white text-lg">指導者招募</p>
				</button>
			</div>
			<Searchbar />
			<ProjectPost />
	</div>
</template>
