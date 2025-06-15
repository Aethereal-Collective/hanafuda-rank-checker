<template>
	<main>
		<div class="section">
			<div class="text-center w-[90%] mx-auto">
				<h1 class="text-center text-3xl font-bold capitalize mt-20">Hanafuda rank checker by points</h1>
				<p>Note: This data is not live. It is refreshed once every 24 hours at 00:00 UTC.</p>
			</div>
		</div>

		<!-- Search by Rank -->
		<PagesRankSearch />

		<!-- Metrics -->

		<div class="text-center w-[90%] mx-auto mt-50">
			<h1 class="text-center text-3xl font-bold capitalize mt-20">Hanametrics</h1>
			<p>Note: This data is not live. It is refreshed once every 24 hours at 00:00 UTC.</p>
		</div>

		<div class="w-[80%] mx-auto flex items-center gap-20 justify-center mt-20">
			<!-- Points Chart -->
			<PagesPointsChart v-if="dataRangePoints" :api-data="dataRangePoints" />

			<div class="space-y-10">
				<PagesStatCard title="Total Points" :value="formatCompact(dataTotalPoints?.totalPointsAllUsers || 0)" icon="💰" />
				<PagesStatCard title="Total Deposits" :value="formatCompact(dataTotalPoints?.totalDepositCount || 0)" icon="📥" />
			</div>
		</div>

		<div class="w-[80%] mx-auto flex flex-wrap 2xl:flex-nowrap items-center gap-20 justify-center mt-20">
			<PagesTopReffTable :value="dataTopReff" />

			<PagesTopDepositTable :value="dataTopDeposit" />

			<PagesTopReffPointsTable :value="dataTopReffPoints" />
		</div>

		<footer class="w-full mt-40 py-4 text-center text-sm text-muted-foreground border-t bg-background">
			<p>Built by Fanreza@æthereal</p>
		</footer>
	</main>
</template>

<script setup lang="ts">
import { formatCompact } from "~/utils/formatCompact";

const { data: dataTopReff } = useFetch("/api/top-reff");
const { data: dataTopDeposit } = useFetch("/api/top-deposit");
const { data: dataTopReffPoints } = useFetch("/api/top-reff-points");

const { data: dataTotalPoints } = useFetch("/api/total-points");
const { data: dataRangePoints } = useFetch("/api/range-points");
</script>
