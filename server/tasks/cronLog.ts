export default defineTask({
	meta: {
		name: "cronLog",
		description: "Run fetcha and database update task",
	},
	run({ payload, context }) {
		console.log("Running Fetch and Database Update Task");

		return { result: "Success" };
	},
});
