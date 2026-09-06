import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createPageViewHandler,
  initialCountFor,
  normalizePageKey,
  RequestValidationError
} from '../netlify/functions/_shared/page-view-core.mjs';
import { createUpstashPageViewStore } from '../netlify/functions/_shared/upstash-page-view-store.mjs';

const makeRequest = (body, method = 'POST') => new Request('https://example.netlify.app/api/page-view', {
  method,
  headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
  body: method === 'POST' ? JSON.stringify(body) : undefined
});

const makeIncrementer = ({ viewCount = 1363, fail = false } = {}) => {
  const calls = [];
  const incrementPageView = async input => {
      calls.push(input);
      if (fail) throw new Error('Simulated database failure.');
      return viewCount;
  };

  return { calls, incrementPageView };
};

test('normalizePageKey removes query strings and adds a post trailing slash', () => {
  assert.equal(normalizePageKey('/post/example?source=test#section'), '/post/example/');
  assert.equal(normalizePageKey('/about.html?source=test'), '/about.html');
});

test('normalizePageKey rejects external and protocol-relative paths', () => {
  assert.throws(() => normalizePageKey('https://example.com/post/test/'), RequestValidationError);
  assert.throws(() => normalizePageKey('//example.com/post/test/'), RequestValidationError);
});

test('initialCountFor follows all configured baseline ranges', () => {
  assert.equal(initialCountFor('about', () => 0.5), 1362);
  assert.equal(initialCountFor('spss', () => 0), 2001);
  assert.equal(initialCountFor('spss', () => 0.999999), 2600);
  assert.equal(initialCountFor('post', () => 0), 1300);
  assert.equal(initialCountFor('post', () => 0.999999), 1600);
});

test('handler atomically creates or increments the about page count', async () => {
  const { calls, incrementPageView } = makeIncrementer({ viewCount: 1363 });
  const handler = createPageViewHandler({
    incrementPageView,
    random: () => 0.5
  });

  const response = await handler(makeRequest({
    pageKey: '/about.html',
    pageType: 'about'
  }));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { pageKey: '/about.html', viewCount: 1363 });
  assert.deepEqual(calls[0], {
    pageKey: '/about.html',
    pageType: 'about',
    initialCount: 1362
  });
});

test('handler rejects invalid method, type, and page combinations', async () => {
  const { incrementPageView } = makeIncrementer();
  const handler = createPageViewHandler({ incrementPageView });

  const methodResponse = await handler(makeRequest(undefined, 'GET'));
  assert.equal(methodResponse.status, 405);
  assert.equal(methodResponse.headers.get('allow'), 'POST');

  const typeResponse = await handler(makeRequest({
    pageKey: '/post/example/',
    pageType: 'unknown'
  }));
  assert.equal(typeResponse.status, 400);

  const mismatchResponse = await handler(makeRequest({
    pageKey: '/post/example/',
    pageType: 'about'
  }));
  assert.equal(mismatchResponse.status, 400);
});

test('handler accepts system archive articles under the demo path', async () => {
  const { incrementPageView } = makeIncrementer({ viewCount: 1301 });
  const handler = createPageViewHandler({
    incrementPageView,
    random: () => 0
  });
  const response = await handler(makeRequest({
    pageKey: '/demo/syntax-highlighting.html',
    pageType: 'post'
  }));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.viewCount, 1301);
});

test('handler returns 503 without exposing a database error', async () => {
  const { incrementPageView } = makeIncrementer({ fail: true });
  const handler = createPageViewHandler({ incrementPageView });
  const response = await handler(makeRequest({
    pageKey: '/post/example/',
    pageType: 'post'
  }));
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.deepEqual(body, { error: 'Page view service is temporarily unavailable.' });
});

test('Upstash store initializes and increments a page count atomically', async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ result: 1363 });
  };
  const store = createUpstashPageViewStore({
    url: 'https://example.upstash.io/',
    token: 'test-token',
    fetchImpl
  });

  const viewCount = await store.incrementPageView({
    pageKey: '/about.html',
    pageType: 'about',
    initialCount: 1362
  });

  assert.equal(viewCount, 1363);
  assert.equal(calls[0].url, 'https://example.upstash.io');
  assert.equal(calls[0].options.method, 'POST');
  assert.equal(calls[0].options.headers.Authorization, 'Bearer test-token');
  const command = JSON.parse(calls[0].options.body);
  assert.equal(command[0], 'EVAL');
  assert.equal(command[2], '1');
  assert.equal(command[3], 'page-view:/about.html');
  assert.equal(command[4], '1362');
});

test('Upstash store rejects missing credentials and invalid responses', async () => {
  assert.throws(
    () => createUpstashPageViewStore({ url: '', token: '' }),
    /UPSTASH_REDIS_REST_URL/
  );

  const store = createUpstashPageViewStore({
    url: 'https://example.upstash.io',
    token: 'test-token',
    fetchImpl: async () => Response.json({ error: 'ERR test' }, { status: 400 })
  });

  await assert.rejects(
    () => store.incrementPageView({ pageKey: '/post/example/', initialCount: 1300 }),
    /Upstash request failed/
  );
});
