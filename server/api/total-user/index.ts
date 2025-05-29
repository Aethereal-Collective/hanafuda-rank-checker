import { getDbInstance } from "~/server/utils/dbConfig";
import { H3Error } from "h3";

interface TotalUserCountResponse {
	totalUserCount: number;
}

export default defineEventHandler(async (event) => {
	const db = getDbInstance();

	try {
		const row = db
			.prepare(
				`
        SELECT 
            COUNT(*) AS totalUserCount
        FROM leaderboard;
      `
			)
			.get();

		return row as unknown as TotalUserCountResponse;
	} catch (error) {
		if (error instanceof H3Error) {
			throw error;
		}

		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
		});
	}
});
