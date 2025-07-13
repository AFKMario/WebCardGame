export interface SuccessResponse {
  success: true;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export type GenericResponse = SuccessResponse | ErrorResponse;
