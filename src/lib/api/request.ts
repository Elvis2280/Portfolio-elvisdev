export const TOO_MANY_REQUESTS_MESSAGE =
  'Too many requests. Please wait a few minutes and try again.';

const FALLBACK_ERROR_MESSAGE = 'Request failed. Please try again later.';

export class ApiRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

function getErrorMessage(body: unknown) {
  if (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof body.error === 'string' &&
    body.error.trim()
  ) {
    return body.error;
  }

  return FALLBACK_ERROR_MESSAGE;
}

export async function parseApiResponse<T>(response: Response): Promise<T> {
  if (response.status === 429) {
    throw new ApiRequestError(TOO_MANY_REQUESTS_MESSAGE, response.status);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = undefined;
  }

  if (!response.ok) {
    throw new ApiRequestError(getErrorMessage(body), response.status);
  }

  return body as T;
}
