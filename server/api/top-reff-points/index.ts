import { getDbInstance } from "~/server/utils/dbConfig";
import { H3Error } from "h3";
import type { TopReffPointsResponse } from "~/model/TopReffPoints.model";

export default defineEventHandler(async (event) => {
	const db = getDbInstance();

	try {
		const row = db
			.prepare(
				`
			SELECT
				i.id AS inviterId,
				i.name AS inviterName,
				SUM(l.totalPoint) AS totalPointsReferred
				FROM leaderboard l
				JOIN inviters i ON l.inviterId = i.id
				GROUP BY l.inviterId
				ORDER BY totalPointsReferred DESC
			LIMIT 10;
      `
			)
			.all();

		return row as unknown as TopReffPointsResponse[];
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
