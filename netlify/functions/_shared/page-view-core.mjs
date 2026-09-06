const MAX_BODY_BYTES = 2048;
const MAX_PAGE_KEY_LENGTH = 512;
const PAGE_TYPES = new Set(['about', 'spss', 'post']);
const BASE_URL = 'https://sociological-lab.invalid';

export class RequestValidationError extends Error {}

export const normalizePageKey = value => {
  if (typeof value !== 'string') {
    throw new RequestValidationError('pageKey must be a string.');
  }

  const trimmed = value.trim();
  if (
    trimmed.length === 0 ||
    trimmed.length > MAX_PAGE_KEY_LENGTH ||
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//')
  ) {
    throw new RequestValidationError('pageKey is invalid.');
  }

  const url = new URL(trimmed, BASE_URL);
  if (url.origin !== BASE_URL) {
    throw new RequestValidationError('pageKey must be a site-relative path.');
  }

  let pathname = url.pathname.replace(/\/{2,}/g, '/');
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
  if (pathname !== '/' && !pathname.endsWith('/') && !hasFileExtension) {
    pathname += '/';
  }

  return pathname;
};

export const validatePageType = value => {
  if (typeof value !== 'string' || !PAGE_TYPES.has(value)) {
    throw new RequestValidationError('pageType is invalid.');
  }
  return value;
};

export const validatePageTypeAndKey = (pageType, pageKey) => {
  if (pageType === 'about' && !pageKey.endsWith('/about.html')) {
    throw new RequestValidationError('The about page type requires an about.html path.');
  }

  const isPostPath = /\/post\/[^/]+\/$/.test(pageKey);
  const isDemoPath = /\/demo\/[^/]+\.html$/.test(pageKey);
  if (pageType !== 'about' && !isPostPath && !isDemoPath) {
    throw new RequestValidationError('Post page types require a single article path.');
  }
};

export const initialCountFor = (pageType, random = Math.random) => {
  if (pageType === 'about') return 1362;

  const [minimum, maximum] = pageType === 'spss'
    ? [2001, 2600]
    : [1300, 1600];
  const sample = Math.min(0.9999999999999999, Math.max(0, random()));

  return minimum + Math.floor(sample * (maximum - minimum + 1));
};

const jsonResponse = (body, status = 200, extraHeaders = {}) => Response.json(body, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    ...extraHeaders
  }
});

const parseRequestBody = async request => {
  const declaredLength = Number.parseInt(request.headers.get('content-length') || '0', 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new RequestValidationError('Request body is too large.');
  }

  let body;
  try {
    body = await request.json();
  } catch {
    throw new RequestValidationError('Request body must be valid JSON.');
  }

  if (!body || Array.isArray(body) || typeof body !== 'object') {
    throw new RequestValidationError('Request body must be a JSON object.');
  }

  return body;
};

export const createPageViewHandler = ({ incrementPageView, random = Math.random }) => {
  if (typeof incrementPageView !== 'function') {
    throw new TypeError('incrementPageView must be a function.');
  }

  return async request => {
    if (request.method !== 'POST') {
      return jsonResponse(
        { error: 'Method not allowed.' },
        405,
        { Allow: 'POST' }
      );
    }

    try {
      const body = await parseRequestBody(request);
      const pageKey = normalizePageKey(body.pageKey);
      const pageType = validatePageType(body.pageType);
      validatePageTypeAndKey(pageType, pageKey);

      const initialCount = initialCountFor(pageType, random);
      const viewCount = Number(await incrementPageView({
        pageKey,
        pageType,
        initialCount
      }));
      if (!Number.isSafeInteger(viewCount) || viewCount < 0) {
        throw new Error('Counter store returned an invalid view count.');
      }

      return jsonResponse({ pageKey, viewCount });
    } catch (error) {
      if (error instanceof RequestValidationError) {
        return jsonResponse({ error: error.message }, 400);
      }

      console.error('Unable to update the page view count.', {
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      return jsonResponse({ error: 'Page view service is temporarily unavailable.' }, 503);
    }
  };
};
