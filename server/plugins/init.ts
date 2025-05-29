import { existsSync } from "fs";
import { resolve } from "path";
import { updateDatabase } from "~/server/utils/updateDatabase";

export default defineNitroPlugin(() => {
	console.log("🚀 Initializing server plugins...");

	// Path absolut ke file database
	const dbPath = resolve("server/data/leaderboard.db");

	if (!existsSync(dbPath)) {
		console.log("📂 Database file not found. Running update...");

		try {
			updateDatabase();
			console.log("✅ Database update task completed successfully.");
		} catch (err) {
			console.error("❌ Error during database update:", err);
		}
	} else {
		console.log("📦 Database file already exists. Skipping update.");
	}
});
