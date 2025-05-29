import { getDbInstance } from "~/server/utils/dbConfig";
import { H3Error } from "h3";
import type { RangePointsResponse } from "~/model/RangePoints.model";

export default defineEventHandler(async (event) => {
	const db = getDbInstance();

	try {
		const row = db
			.prepare(
				`
        SELECT
        CASE
            WHEN totalPoint <= 10000 THEN '0 - 10K'
            WHEN totalPoint <= 100000 THEN '10K - 100K'
            WHEN totalPoint <= 1000000 THEN '100K - 1M'
            WHEN totalPoint <= 10000000 THEN '1M - 10M'
            WHEN totalPoint <= 100000000 THEN '10M - 100M'
            WHEN totalPoint <= 1000000000 THEN '100M - 1B'
            WHEN totalPoint <= 10000000000 THEN '1B - 10B'
            ELSE '10B+'
        END AS pointRange,
        COUNT(*) AS userCount
        FROM leaderboard
        GROUP BY pointRange
        ORDER BY 
        CASE 
            WHEN pointRange = '0 - 10K' THEN 1
            WHEN pointRange = '10K - 100K' THEN 2
            WHEN pointRange = '100K - 1M' THEN 3
            WHEN pointRange = '1M - 10M' THEN 4
            WHEN pointRange = '10M - 100M' THEN 5
            WHEN pointRange = '100M - 1B' THEN 6
            WHEN pointRange = '1B - 10B' THEN 7
            WHEN pointRange = '10B+' THEN 8
        END;
      `
			)
			.all();

		return row as unknown as RangePointsResponse[];
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
