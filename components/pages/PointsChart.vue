<template>
	<!-- Place the component inside a div with a given width -->
	<div class="w-[500px]">
		<ClientOnly>
			<VueUiDonut :dataset="dataset" :config="config" />
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { VueUiDonut } from "vue-data-ui";
import "vue-data-ui/style.css";
import type { RangePointsResponse } from "~/model/RangePoints.model";

const props = defineProps<{
	apiData: RangePointsResponse[];
}>();

const config = ref({
	useCssAnimation: true,
	useBlurOnHover: true,
	style: {
		fontFamily: "inherit",
		chart: {
			useGradient: true,
			gradientIntensity: 40,
			backgroundColor: "rgba(0,0,0,0)",
			color: "#CCCCCC",
			layout: {
				curvedMarkers: true,
				labels: {
					dataLabels: { show: true, hideUnderValue: 0 },
					value: { show: true, rounding: 0 },
					percentage: { color: "#CCCCCC", bold: true, fontSize: 12 },
					name: { color: "#CCCCCC", bold: false, fontSize: 12 },
					hollow: {
						total: { show: true, bold: false, fontSize: 16, color: "#CCCCCC", text: "Total Users", offsetY: -14, value: { color: "#CCCCCC", fontSize: 16, bold: true } },
						average: { show: false },
					},
				},

				donut: { strokeWidth: 64, borderWidth: 1 },
			},
			legend: { show: true, backgroundColor: "rgba(0,0,0,0)", color: "#CCCCCC", fontSize: 12 },

			title: { text: "Users per Points", color: "#CCCCCC", fontSize: 20, bold: true },
			tooltip: { show: true, backgroundColor: "rgba(0,0,0,0)", color: "#CCCCCC", fontSize: 12, showValue: true, roundingValue: 0, showPercentage: true, roundingPercentage: 0 },
		},
	},
	userOptions: { show: false },
});

const grayscale = [
	"#E0E0E0", // abu terang
	"#C0C0C0",
	"#A0A0A0",
	"#808080",
	"#606060",
	"#404040",
	"#202020",
	"#000000", // hitam pekat
];

const dataset = ref(
	props.apiData.map((item, index) => ({
		name: item.pointRange,
		values: [item.userCount],
		color: grayscale[index] || "#000000", // fallback kalau datanya lebih banyak
	}))
);
</script>
