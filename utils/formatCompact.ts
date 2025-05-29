export const formatCompact = (value: number) => {
	return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 }).format(value);
};
