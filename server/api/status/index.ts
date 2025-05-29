// server/api/last-updated.ts
import { getLastUpdated } from "~/server/utils/lastUpdate";

export default defineEventHandler(async () => {
	const lastUpdate = await getLastUpdated();

	return {
		lastUpdated: lastUpdate,
		message: "Data refreshed every day at 00:00 UTC, this is not live data.",
	};
});
