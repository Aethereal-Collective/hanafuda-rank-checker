<template>
	<div class="search w-[90%] md:w-[50%] mx-auto mt-20">
		<span class="text-gray-500 text-sm">Last Updated {{ formatDate(dataLastUpdate?.lastUpdated) }} UTC</span>

		<div class="search-bar flex w-full items-center gap-1.5">
			<Input v-model="searchQuery" placeholder="Search Username eg: Fanreza" />
			<Button @click="getRankedUsers" :disabled="isLoadingGetRankedUsers">
				<Loader2 v-if="isLoadingGetRankedUsers" class="w-4 h-4 mr-2 animate-spin" />
				Search
			</Button>
		</div>

		<!-- If error -->
		<Alert variant="destructive" class="mt-5" v-if="rankedUserError">
			<AlertCircle class="w-4 h-4" />
			<AlertTitle>{{ rankedUserError.message }}</AlertTitle>
		</Alert>
	</div>

	<div class="card mt-10" v-if="rankedUserData">
		<Card class="max-w-sm mx-auto">
			<CardHeader>
				<CardTitle>{{ rankedUserData.userName }}</CardTitle>
				<CardDescription>Rank by Point: {{ rankedUserData.rank }}</CardDescription>
				<CardDescription>Rank by Deposit: {{ rankedUserData.rankDeposit }}</CardDescription>
			</CardHeader>
			<CardContent class="space-y-2">
				<div class="flex items-center space-x-4">
					<img :src="rankedUserData.userIconPath" alt="User Icon" class="w-16 h-16 rounded-full object-cover" />
					<div>
						<p><strong>Total Point:</strong> {{ formatCompact(rankedUserData.totalPoint) }}</p>
						<p><strong>Deposit Count:</strong> {{ rankedUserData.depositCount }}</p>
						<!-- <p><strong>Last Deposited:</strong> {{  }}</p> -->
						<p><strong>Inviter:</strong> {{ rankedUserData.inviterName }}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</template>

<script setup lang="ts">
import { Loader2, AlertCircle } from "lucide-vue-next";

import type { LeaderboardResponse } from "~/model/Leaderboard.model";
import type { ApiError } from "~/model/global/Error.model";

import { formatError } from "~/utils/formatError";
import { formatDate } from "~/utils/formatDate";
import { formatCompact } from "~/utils/formatCompact";

// Get rank user by search
const searchQuery = ref("");

const isLoadingGetRankedUsers = ref(false);
const rankedUserData = ref<LeaderboardResponse | null>(null);
const rankedUserError = ref<ApiError | null>(null);

const getRankedUsers = async () => {
	isLoadingGetRankedUsers.value = true;
	rankedUserError.value = null;
	rankedUserData.value = null;

	try {
		const res = await $fetch(`/api/rank/${searchQuery.value}`);
		rankedUserData.value = res;
	} catch (e) {
		const err = formatError(e);

		rankedUserError.value = err;
	} finally {
		isLoadingGetRankedUsers.value = false;
	}
};

// Get last updated data date
const { data: dataLastUpdate } = await useFetch<{ lastUpdated: string }>("/api/status");
</script>
