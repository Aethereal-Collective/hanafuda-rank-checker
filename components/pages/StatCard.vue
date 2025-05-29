<template>
	<div class="bg-card text-card-foreground rounded-2xl p-6 shadow-sm border border-border flex items-center gap-4">
		<div class="text-3xl">{{ icon }}</div>
		<div>
			<div class="text-sm uppercase text-muted-foreground tracking-wide">{{ title }}</div>
			<div class="text-2xl font-semibold">{{ value }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string;
	value: string | number | undefined | null;
	icon?: string;
}>();
</script>
