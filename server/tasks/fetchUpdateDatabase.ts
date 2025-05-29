import { updateDatabase } from "~/server/utils/updateDatabase";

export default defineTask({
	meta: {
		name: "fetchUpdateDatabase",
		description: "Run fetcha and database update task",
	},
	run({ payload, context }) {
		console.log("Running Fetch and Database Update Task");

		try {
			updateDatabase();

			return { result: "Success" };
		} catch (err) {
			console.error("❌ Error during database update:", err);

			return { result: "Error", error: err instanceof Error ? err.message : "Unknown error" };
		}
	},
});
