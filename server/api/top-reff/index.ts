import { getDbInstance } from "~/server/utils/dbConfig";
import { H3Error } from "h3";
import type { TotalUserCountResponse } from "~/model/TopReff.model";

export default defineEventHandler(async (event) => {
	const db = getDbInstance();

	try {
		const row = db
			.prepare(
				`
            SELECT
            i.id AS inviterId,
            i.name AS inviterName,
            COUNT(l.userId) AS totalReferredUsers
            FROM leaderboard l
            JOIN inviters i ON l.inviterId = i.id
            GROUP BY l.inviterId
            ORDER BY totalReferredUsers DESC
            LIMIT 10;

      `
			)
			.all();

		return row as unknown as TotalUserCountResponse[];
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
