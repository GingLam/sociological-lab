import { createPageViewHandler } from './_shared/page-view-core.mjs';
import { createUpstashPageViewStore } from './_shared/upstash-page-view-store.mjs';

let pageViewStore;

const incrementPageView = input => {
  pageViewStore ??= createUpstashPageViewStore({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });
  return pageViewStore.incrementPageView(input);
};

export default createPageViewHandler({ incrementPageView });

export const config = {
  path: '/api/page-view'
};
