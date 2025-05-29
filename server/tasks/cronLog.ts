export default defineTask({
	meta: {
		name: "cronLog",
		description: "Run cron logs",
	},
	run({ payload, context }) {
		console.log("Running Cron Logs");

		return { result: "Success" };
	},
});
