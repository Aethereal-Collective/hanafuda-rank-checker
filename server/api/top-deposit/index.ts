import { getDbInstance } from "~/server/utils/dbConfig";
import { H3Error } from "h3";
import type { TopDepositResponse } from "~/model/TopDeposit.model";

export default defineEventHandler(async (event) => {
	const db = getDbInstance();

	try {
		const topDepositors = db
			.prepare(
				`
            SELECT 
              l.id,
              l.depositCount,
              l.totalPoint,
              l.lastDepositedAt,
              l.rankDeposit,
              u.id as userId,
              u.name as userName,
              u.iconPath
            FROM leaderboard l
            LEFT JOIN users u ON u.id = l.userId
            WHERE l.rankDeposit IS NOT NULL
            ORDER BY l.rankDeposit ASC
            LIMIT 10
          `
			)
			.all();

		return (topDepositors as TopDepositResponse[]) || [];
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
