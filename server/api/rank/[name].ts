import type { LeaderboardResponse } from "~/model/Leaderboard.model";
import { getDbInstance } from "~/server/utils/dbConfig";

import { H3Error } from "h3";

export default defineEventHandler(async (event) => {
	const db = getDbInstance();
	const name = getRouterParam(event, "name")?.toLowerCase();

	if (!name) {
		throw createError({ statusCode: 400, statusMessage: "Name parameter is required" });
	}

	try {
		const row = db
			.prepare(
				`
        SELECT
          l.id,
          l.depositCount,
          l.totalPoint,
          l.lastDepositedAt,
          l.rank,
          l.userId,
          l.inviterId,
          u.sub AS userSub,
          u.name AS userName,
          u.iconPath AS userIconPath,
          i.name AS inviterName
        FROM leaderboard l
        LEFT JOIN users u ON l.userId = u.id
        LEFT JOIN inviters i ON l.inviterId = i.id
        WHERE LOWER(u.name) = ?
      `
			)
			.get(name);

		if (!row) {
			throw createError({ statusCode: 404, statusMessage: "Name not found" });
		}

		return row as LeaderboardResponse;
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
