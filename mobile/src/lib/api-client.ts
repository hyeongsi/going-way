import { apiBaseUrl } from '@/config/api';

type ApiRequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: RequestInit['body'];
  headers?: HeadersInit;
  json?: unknown;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly responseBody: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiNetworkError extends Error {
  constructor(cause: unknown) {
    super('서버에 연결하지 못했습니다. 네트워크와 API 주소를 확인해 주세요.');
    this.name = 'ApiNetworkError';
    this.cause = cause;
  }
}

function createUrl(path: string) {
  return `${apiBaseUrl}/${path.replace(/^\/+/, '')}`;
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json')
    ? response.json()
    : response.text();
}

/**
 * 모든 Spring API 호출이 사용할 공통 요청 함수입니다.
 * 도메인별 endpoint나 인증 헤더는 기능을 구현할 때 이 위에 얹습니다.
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { headers, json, body, ...requestOptions } = options;
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');

  if (json !== undefined) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  let response: Response;
  try {
    response = await fetch(createUrl(path), {
      ...requestOptions,
      headers: requestHeaders,
      body: json === undefined ? body : JSON.stringify(json),
    });
  } catch (error) {
    throw new ApiNetworkError(error);
  }

  const responseBody = await readResponseBody(response);
  if (!response.ok) {
    throw new ApiError(
      `API 요청에 실패했습니다. (${response.status})`,
      response.status,
      responseBody,
    );
  }

  return responseBody as T;
}
