(() => {
  'use strict';

  const SELECTOR = '.js-music-playlist:not([data-music-playlist-initialized])';
  const MAX_ATTEMPTS = 200;
  const RETRY_DELAY_MS = 50;

  const parseBoolean = value => value === 'true';

  const initializePlayers = () => {
    document.querySelectorAll(SELECTOR).forEach(container => {
      const dataElement = container.querySelector('.music-playlist-data');
      if (!dataElement) return;

      try {
        let audio = JSON.parse(dataElement.textContent);
        // Hugo may serialize data values as a JSON string in shortcode output.
        // Decode that outer string before handing the track array to APlayer.
        if (typeof audio === 'string') audio = JSON.parse(audio);
        if (!Array.isArray(audio) || audio.length === 0) {
          throw new Error('The playlist has no tracks.');
        }

        const requestedVolume = Number.parseFloat(container.dataset.volume);
        const volume = Number.isFinite(requestedVolume)
          ? Math.min(1, Math.max(0, requestedVolume))
          : 0.5;
        const requestedListHeight = Number.parseInt(container.dataset.listMaxHeight, 10);

        container.aplayer = new window.APlayer({
          container,
          audio,
          autoplay: parseBoolean(container.dataset.autoplay),
          listFolded: parseBoolean(container.dataset.listFolded),
          listMaxHeight: Number.isFinite(requestedListHeight) ? requestedListHeight : 180,
          loop: container.dataset.loop || 'all',
          mutex: true,
          order: container.dataset.order || 'list',
          preload: 'metadata',
          storageName: container.dataset.storageName || 'sociological-lab-playlist',
          theme: container.dataset.theme || '#448aff',
          volume
        });
        container.dataset.musicPlaylistInitialized = 'true';
      } catch (error) {
        console.error('Unable to initialize the music playlist.', error);
      }
    });
  };

  const initializeWhenReady = (attempt = 0) => {
    if (!document.querySelector(SELECTOR)) return;
    if (typeof window.APlayer === 'function') {
      initializePlayers();
      return;
    }
    if (attempt < MAX_ATTEMPTS) {
      window.setTimeout(() => initializeWhenReady(attempt + 1), RETRY_DELAY_MS);
      return;
    }
    console.error('Unable to initialize the music playlist because APlayer did not load.');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeWhenReady(), { once: true });
  } else {
    initializeWhenReady();
  }
})();
