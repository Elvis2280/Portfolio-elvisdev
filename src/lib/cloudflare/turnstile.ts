import type { TurnstileResponse } from '@/types/cloudflare';

const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const TURNSTILE_REJECTED_MESSAGE =
  'Security verification failed. Please try again.';
export const TURNSTILE_UNAVAILABLE_MESSAGE =
  'Security verification is temporarily unavailable. Please try again.';

export class TurnstileConfigurationError extends Error {
  constructor(message = 'Turnstile is not configured') {
    super(message);
    this.name = 'TurnstileConfigurationError';
  }
}

export class TurnstileUnavailableError extends Error {
  constructor(message = TURNSTILE_UNAVAILABLE_MESSAGE) {
    super(message);
    this.name = 'TurnstileUnavailableError';
  }
}

function isTurnstileResponse(value: unknown): value is TurnstileResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const response = value as Partial<TurnstileResponse>;
  return (
    typeof response.success === 'boolean' &&
    (response.hostname === undefined ||
      typeof response.hostname === 'string') &&
    (response.action === undefined || typeof response.action === 'string') &&
    (response['error-codes'] === undefined ||
      (Array.isArray(response['error-codes']) &&
        response['error-codes'].every((code) => typeof code === 'string')))
  );
}

export async function verifyTurnstileToken(
  token: string,
  expectedAction: 'contact_form' | 'request_cv',
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? '')
    .split(',')
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (!secret || allowedHostnames.length === 0) {
    throw new TurnstileConfigurationError();
  }

  if (typeof token !== 'string' || !token || token.length > 2048) {
    return false;
  }

  let response: Response;
  let result: TurnstileResponse;

  try {
    response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        secret,
        response: token,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new TurnstileUnavailableError();
    }

    const body: unknown = await response.json();
    if (!isTurnstileResponse(body)) {
      throw new TurnstileUnavailableError();
    }

    result = body;
  } catch (error) {
    if (error instanceof TurnstileUnavailableError) {
      throw error;
    }

    throw new TurnstileUnavailableError();
  }

  const errorCodes = result['error-codes'] ?? [];
  if (
    errorCodes.includes('missing-input-secret') ||
    errorCodes.includes('invalid-input-secret')
  ) {
    throw new TurnstileConfigurationError();
  }

  if (errorCodes.includes('internal-error')) {
    throw new TurnstileUnavailableError();
  }

  return (
    result.success === true &&
    result.action === expectedAction &&
    !!result.hostname &&
    allowedHostnames.includes(result.hostname)
  );
}
