import type { ApiError } from "~/model/global/Error.model";

// fungsi untuk bikin ApiError dengan objek biasa, bukan class
function createApiError(message: string, statusCode: number): ApiError {
	return {
		name: "ApiError",
		message,
		statusCode,
		stack: new Error().stack,
	};
}

export function formatError(error: unknown): ApiError {
	if (error && typeof error === "object" && "statusCode" in error && "message" in error) {
		return createApiError((error as any).statusMessage, (error as any).statusCode);
	}
	if (error instanceof Error) {
		return createApiError(error.message, 500);
	}
	if (typeof error === "string") {
		return createApiError(error, 500);
	}
	return createApiError("Unknown error", 500);
}
