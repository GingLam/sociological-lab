(() => {
  'use strict';

  const COUNTER_SELECTOR = '.js-page-view-count';
  const NEW_COUNTER_SELECTOR = `${COUNTER_SELECTOR}:not([data-page-view-initialized])`;
  const REQUEST_TIMEOUT_MS = 8000;

  const showUnavailable = element => {
    element.textContent = '—';
    element.dataset.pageViewState = 'unavailable';
  };

  const initializeCounter = async element => {
    element.dataset.pageViewInitialized = 'true';

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/page-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pageKey: element.dataset.pageKey,
          pageType: element.dataset.pageType
        }),
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Page view request failed with status ${response.status}.`);
      }

      const data = await response.json();
      if (!Number.isSafeInteger(data.viewCount) || data.viewCount < 0) {
        throw new Error('Page view response contained an invalid count.');
      }

      element.textContent = new Intl.NumberFormat(document.documentElement.lang).format(data.viewCount);
      element.dataset.pageViewState = 'ready';
    } catch (error) {
      showUnavailable(element);
      console.warn('Unable to display the page view count.', error);
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const initializePageViewCounters = (includeInitialized = false) => {
    const selector = includeInitialized ? COUNTER_SELECTOR : NEW_COUNTER_SELECTOR;
    document.querySelectorAll(selector).forEach(element => {
      initializeCounter(element);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageViewCounters, { once: true });
  } else {
    initializePageViewCounters();
  }

  window.addEventListener('pageshow', event => {
    // Restoring from the back-forward cache is a new view but skips DOMContentLoaded.
    if (event.persisted) initializePageViewCounters(true);
  });
})();
