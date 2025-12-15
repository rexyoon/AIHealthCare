export interface FieldError {
  field: string;
  message: string;
}

export type ApiErrorDetail = null | FieldError[] | Record<string, any>;

export interface ApiResponse<T> {
  success: boolean;
  code: number | string;
  message: string;
  data: T;
  error: ApiErrorDetail;
}

export interface ApiError {
  message: string;
  code: number | string;
  error: FieldError[] | null;
}

export interface PaginationData<T> {
  content: T[];
  hasNext: boolean;
  page: number;
  size: number;
}

export type InfiniteApiResponse<T> = ApiResponse<PaginationData<T>>;
