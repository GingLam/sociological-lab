const PAGE_VIEW_KEY_PREFIX = 'page-view:';
const REQUEST_TIMEOUT_MS = 7000;

// Redis executes a Lua script atomically, so concurrent first visits cannot
// overwrite each other or lose an increment.
const INITIALIZE_AND_INCREMENT_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 0 then
  redis.call('SET', KEYS[1], ARGV[1])
end
return redis.call('INCR', KEYS[1])
`.trim();

const requireCredential = (value, name) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${name} is not configured.`);
  }
  return value.trim();
};

export const createUpstashPageViewStore = ({
  url,
  token,
  fetchImpl = globalThis.fetch
}) => {
  const endpoint = requireCredential(url, 'UPSTASH_REDIS_REST_URL').replace(/\/+$/, '');
  const authorizationToken = requireCredential(token, 'UPSTASH_REDIS_REST_TOKEN');

  if (typeof fetchImpl !== 'function') {
    throw new TypeError('fetchImpl must be a function.');
  }

  return {
    incrementPageView: async ({ pageKey, initialCount }) => {
      const response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          'EVAL',
          INITIALIZE_AND_INCREMENT_SCRIPT,
          '1',
          `${PAGE_VIEW_KEY_PREFIX}${pageKey}`,
          String(initialCount)
        ]),
        cache: 'no-store',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(`Upstash returned a non-JSON response (${response.status}).`);
      }

      if (!response.ok || result?.error) {
        throw new Error(`Upstash request failed (${response.status}).`);
      }

      const viewCount = Number(result?.result);
      if (!Number.isSafeInteger(viewCount) || viewCount < 0) {
        throw new Error('Upstash returned an invalid view count.');
      }

      return viewCount;
    }
  };
};
