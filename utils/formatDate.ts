import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * Formats a date string to a more readable format.
 * @param {string} date - The date string to format.
 * @returns {string} - The formatted date string in "MMM D, YYYY HH:mm" format. Example: "Jan 1, 2023 12:00".
 */
export const formatDate = (date: Date | string | null | undefined): string => {
	if (!date) {
		return "";
	}

	// Convert to dayjs object, handling both Date and string inputs
	return dayjs.utc(date).format("MMM D, YYYY HH:mm");
};

export const formatTimestamp = (timestamp: string | null | undefined): string => {
	if (!timestamp) {
		return "";
	}

	// Convert to dayjs object, handling both number and string inputs
	return dayjs.utc(parseInt(timestamp)).format("MMM D, YYYY HH:mm");
};
