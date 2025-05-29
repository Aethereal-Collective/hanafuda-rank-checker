<template>
	<div class="w-full">
		<h2 class="text-muted-foreground font-bold">Top Points by Refferal</h2>

		<Table class="mt-5">
			<TableHeader>
				<TableRow>
					<TableHead class="w-[100px]">#</TableHead>
					<TableHead>Inviter</TableHead>
					<TableHead>Total Referred Users Points</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="(item, index) in value" :key="item.inviterId">
					<TableCell class="font-medium">{{ index + 1 }}</TableCell>
					<TableCell>{{ item.inviterName }}</TableCell>
					<TableCell>{{ formatCompact(item.totalPointsReferred) }}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>
</template>

<script setup lang="ts">
import type { TopReffPointsResponse } from "~/model/TopReffPoints.model";
import { formatCompact } from "~/utils/formatCompact";

defineProps<{
	value: TopReffPointsResponse[] | null;
}>();
</script>
