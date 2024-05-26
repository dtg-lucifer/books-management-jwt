export interface FetchState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

export interface UseAuthenticatedApiResult<T> extends FetchState<T> {
	refetch: (data: Record<string, any>) => void;
}