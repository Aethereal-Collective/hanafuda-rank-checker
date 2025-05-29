<template>
	<div class="w-full">
		<h2 class="text-muted-foreground font-bold">Top Referral</h2>

		<Table class="mt-5">
			<TableHeader>
				<TableRow>
					<TableHead class="w-[100px]">#</TableHead>
					<TableHead>Inviter</TableHead>
					<TableHead>Total Referred Users</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="(item, index) in value" :key="item.inviterId">
					<TableCell class="font-medium">{{ index + 1 }}</TableCell>
					<TableCell>{{ item.inviterName }}</TableCell>
					<TableCell>{{ item.totalReferredUsers }}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>
</template>

<script setup lang="ts">
import type { TotalUserCountResponse } from "~/model/TopReff.model";

defineProps<{
	value: TotalUserCountResponse[] | null;
}>();
</script>
