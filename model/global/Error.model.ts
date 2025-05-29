export interface ApiError extends Error {
	statusCode: number;
	statusMessage?: string;
	message: string;
	stack?: string;
	[key: string]: any;
}

export interface LocalError {
	message: string;
	stack?: string;
	name?: string;
}

export type AppError = ApiError | LocalError | Error | unknown;
