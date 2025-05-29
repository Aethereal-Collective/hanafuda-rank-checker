import { $fetch } from "ofetch";
import type { LeaderboardResponse } from "~/model/Leaderboard.model";

export async function fetchAllLeaderboard(): Promise<LeaderboardResponse[]> {
	const ENDPOINT = "https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql";
	const LIMIT = 1000;
	let offset = 0;
	const all: LeaderboardResponse[] = [];

	while (true) {
		const query = `
		query getTopStatusSnapshots($offset: Int, $limit: Int) {
		  getTopStatusSnapshots(offset: $offset, limit: $limit) {
			id
			depositCount
			totalPoint
			lastDepositedAt
			user {
			  id
			  sub
			  name
			  iconPath
			}
			inviter {
			  id
			  name
			}
		  }
		}
	  `;

		const res = (await $fetch(ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query,
				variables: { offset, limit: LIMIT },
				operationName: "getTopStatusSnapshots",
			}),
		})) as { data: { getTopStatusSnapshots: LeaderboardResponse[] } };

		const data = res.data.getTopStatusSnapshots;

		if (!data || data.length === 0) break;
		all.push(...data);
		offset += LIMIT;

		console.log(`Fetched ${data.length} entries, total: ${all.length}`);
	}

	return all;
}
