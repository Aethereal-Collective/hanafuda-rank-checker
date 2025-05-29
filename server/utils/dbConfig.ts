import Database from "better-sqlite3";
import { resolve } from "path";

export function getDbInstance() {
	const dbPath = resolve("server/data/leaderboard.db");
	return new Database(dbPath);
}
