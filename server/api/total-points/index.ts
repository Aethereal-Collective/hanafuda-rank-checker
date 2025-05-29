import { getDbInstance } from "~/server/utils/dbConfig";
import { H3Error } from "h3";
import type { TotalPointsResponse } from "~/model/TotalPoints.model";

export default defineEventHandler(async (event) => {
	const db = getDbInstance();

	try {
		const row = db
			.prepare(
				`
        SELECT 
            SUM(totalPoint) AS totalPointsAllUsers,
            SUM(depositCount) AS totalDepositCount
        FROM leaderboard;
      `
			)
			.get();

		return row as unknown as TotalPointsResponse;
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
