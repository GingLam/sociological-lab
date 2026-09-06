import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createPageViewHandler,
  initialCountFor,
  normalizePageKey,
  RequestValidationError
} from '../netlify/functions/_shared/page-view-core.mjs';

const makeRequest = (body, method = 'POST') => new Request('https://example.netlify.app/api/page-view', {
  method,
  headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
  body: method === 'POST' ? JSON.stringify(body) : undefined
});

const makeDatabase = ({ viewCount = 1363, fail = false } = {}) => {
  const calls = [];
  const database = {
    sql: async (strings, ...values) => {
      calls.push({ query: strings.join('?'), values });
      if (fail) throw new Error('Simulated database failure.');
      return [{ page_key: values[0], view_count: String(viewCount) }];
    }
  };

  return { calls, database };
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
  const { calls, database } = makeDatabase({ viewCount: 1363 });
  const handler = createPageViewHandler({
    getDatabase: () => database,
    random: () => 0.5
  });

  const response = await handler(makeRequest({
    pageKey: '/about.html',
    pageType: 'about'
  }));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { pageKey: '/about.html', viewCount: 1363 });
  assert.deepEqual(calls[0].values, ['/about.html', 'about', 1362, 1363]);
  assert.match(calls[0].query, /ON CONFLICT \(page_key\) DO UPDATE/);
  assert.match(calls[0].query, /page_views\.view_count \+ 1/);
});

test('handler rejects invalid method, type, and page combinations', async () => {
  const { database } = makeDatabase();
  const handler = createPageViewHandler({ getDatabase: () => database });

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
  const { database } = makeDatabase({ viewCount: 1301 });
  const handler = createPageViewHandler({
    getDatabase: () => database,
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
  const { database } = makeDatabase({ fail: true });
  const handler = createPageViewHandler({ getDatabase: () => database });
  const response = await handler(makeRequest({
    pageKey: '/post/example/',
    pageType: 'post'
  }));
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.deepEqual(body, { error: 'Page view service is temporarily unavailable.' });
});
