<script setup>
import { useAuthStore } from "~/store/auth";
import { useSearchStore } from "~/store/searchbar";
const authStore = useAuthStore();
const searchStore = useSearchStore();
const isLogin = authStore.isLogin;
const router = useRouter();

if (!isLogin || !authStore.userInfo.roleVerified) {
	router.push("/");
}
</script>
<template>
	<LoginedNavbar />
	<Searchbar />
	<Sidebar />
	<UModal v-model="searchStore.isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>
	<div class="flex flex-col items-center w-11/12 md:w-3/5 lg:w-3/5 pt-28 md:pt-36 lg:pt-36 pb-20 mx-auto gap-4">
		

			<div class="flex justify-between px-4 py-2 m-4 w-full" style="background-color: rgba(217, 217, 217, 0.2)">
				<div class="flex justify-center px-4 py-2 w-1/2" style="background-color: rgba(217, 217, 217, 0.2)">
					<p class="text-white text-lg">學生招募</p>
				</div>
				<div class="flex justify-center px-4 py-2 w-1/2">
					<p class="text-white text-lg">指導者招募</p>
				</div>
			</div>
			<div class="flex items-center justify-between h-40 px-4 py-4 w-full" style="background-color: rgba(217, 217, 217, 0.2)">
				<div class="flex flex-col justify-between h-full">
					<div class="flex flex-col">
						<p class="text-white text-2xl font-bold">專題題目</p>
						<p class="text-white text-sm mt-1">
							專題的部分描述,大約抓20 ~ 50字顯示
						</p>
					</div>
					<div class="flex">
						<p class="text-black text-xs bg-white rounded-2xl px-2 py-1 font-bold mr-2">
							畢業專題
						</p>
						<p class="text-black text-xs bg-white rounded-2xl px-2 py-1 font-bold mr-2">
							畢業專題資工系
						</p>
					</div>
				</div>

				<div class=" h-28 w-28" style="background-color: rgba(217, 217, 217, 0.2)"></div>
			</div>
	</div>
</template>
