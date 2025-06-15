<template>
	<div class="w-full">
		<h2 class="text-muted-foreground font-bold">Top Deposit</h2>

		<Table class="mt-5">
			<TableHeader>
				<TableRow>
					<TableHead class="w-[100px]">#</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Last Deposit</TableHead>
					<TableHead>Total Deposit</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="(item, index) in value" :key="item.id">
					<TableCell class="font-medium">{{ index + 1 }}</TableCell>
					<TableCell>{{ item.userName }}</TableCell>
					<TableCell>{{ formatTimestamp(item.lastDepositedAt) }}</TableCell>
					<TableCell>{{ item.depositCount }}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>
</template>

<script setup lang="ts">
import type { TopDepositResponse } from "~/model/TopDeposit.model";
import { formatTimestamp } from "~/utils/formatDate";

defineProps<{
	value: TopDepositResponse[] | null;
}>();
</script>
