import type { LeaderboardResponse } from "~/model/Leaderboard.model";
import { getDbInstance } from "~/server/utils/dbConfig";
import { setLastUpdated } from "~/server/utils/lastUpdate";
import { fetchAllLeaderboard } from "./fetchLeaderboard";

export async function updateDatabase(): Promise<void> {
	const data: LeaderboardResponse[] = await fetchAllLeaderboard();
	const db = getDbInstance();
	setLastUpdated(new Date());

	db.exec(`
	  DROP TABLE IF EXISTS leaderboard;
	  DROP TABLE IF EXISTS users;
	  DROP TABLE IF EXISTS inviters;

	  CREATE TABLE leaderboard (
		id TEXT PRIMARY KEY,
		depositCount INTEGER,
		totalPoint INTEGER,
		lastDepositedAt TEXT,
		rank INTEGER,
		rankDeposit INTEGER,
		userId TEXT,
		inviterId TEXT
	  );

	  CREATE TABLE users (
		id TEXT PRIMARY KEY,
		sub TEXT,
		name TEXT,
		iconPath TEXT
	  );

	  CREATE TABLE inviters (
		id TEXT PRIMARY KEY,
		name TEXT
	  );

	  CREATE INDEX idx_leaderboard_userId ON leaderboard(userId);
	  CREATE INDEX idx_leaderboard_inviterId ON leaderboard(inviterId);
	`);

	const insertUser = db.prepare(`
	  INSERT OR REPLACE INTO users (id, sub, name, iconPath)
	  VALUES (?, ?, ?, ?)
	`);

	const insertInviter = db.prepare(`
	  INSERT OR REPLACE INTO inviters (id, name)
	  VALUES (?, ?)
	`);

	const insertLeaderboard = db.prepare(`
	  INSERT OR REPLACE INTO leaderboard (
		id, depositCount, totalPoint, lastDepositedAt, rank, rankDeposit, userId, inviterId
	  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
	`);

	const insertMany = db.transaction((items: LeaderboardResponse[]) => {
		// Hitung rank berdasarkan totalPoint (default)
		let rank = 1;

		// Hitung rankDeposit berdasarkan depositCount
		const sortedByDeposit = [...items].sort((a, b) => {
			const depA = Number(a.depositCount) || 0;
			const depB = Number(b.depositCount) || 0;
			return depB - depA;
		});

		const depositRankMap: Record<string, number> = {};
		sortedByDeposit.forEach((item, index) => {
			depositRankMap[item.id] = index + 1;
		});

		for (const item of items) {
			if (item.user) {
				insertUser.run(item.user.id, item.user.sub, item.user.name, item.user.iconPath);
			}
			if (item.inviter) {
				insertInviter.run(item.inviter.id, item.inviter.name);
			}

			const depositCountNum = Number(item.depositCount) || 0;
			const totalPointNum = Number(item.totalPoint) || 0;
			const depositRank = depositRankMap[item.id] ?? null;

			insertLeaderboard.run(item.id, depositCountNum, totalPointNum, item.lastDepositedAt, rank, depositRank, item.user?.id ?? null, item.inviter?.id ?? null);

			rank++;
		}
	});

	insertMany(data);
	console.log(`✅ Database updated. Total rows: ${data.length}`);
}
