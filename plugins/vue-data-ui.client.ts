import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";

export default defineNuxtPlugin((nuxtApp) => {
	// OR register the universal component if you plan to use it
	nuxtApp.vueApp.component("VueDataUi", VueDataUi);
});
