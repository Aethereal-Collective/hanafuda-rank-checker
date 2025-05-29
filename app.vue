<script setup>
useSeoMeta({
	title: "Hana Points Leaderboard",
	ogTitle: "Hana Points Leaderboard",
});
</script>

<template>
	<Html lang="en" class="dark">
		<div>
			<NuxtLayout>
				<NuxtLoadingIndicator color="#B68A62" />
				<NuxtPage />
			</NuxtLayout>
		</div>
	</Html>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
	transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
