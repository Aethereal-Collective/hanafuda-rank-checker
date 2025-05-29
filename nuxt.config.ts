import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-05-29",
	modules: ["shadcn-nuxt"],

	nitro: {
		experimental: {
			tasks: true,
		},

		scheduledTasks: {
			// Run `cms:update` task every minute
			"0 0 * * *": ["fetchUpdateDatabase"],
		},
	},

	css: ["~/assets/css/tailwind.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
});
