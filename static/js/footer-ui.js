/**
 * Close the language menu whenever the pointer leaves the whole selector.
 * The theme only watches the option list, which can leave the menu open when
 * the pointer exits directly from the selected-language row.
 */
(() => {
  const bindLanguageMenuAutoClose = () => {
    const select = document.getElementById('lang-select');
    const options = document.getElementById('lang-options');
    const arrow = document.querySelector('#lang-selected > i');

    if (!select || !options || !arrow || select.dataset.autoCloseBound) return;
    select.dataset.autoCloseBound = 'true';

    let closeTimer;

    const cancelClose = () => {
      window.clearTimeout(closeTimer);
    };

    const closeMenu = () => {
      arrow.className = 'fa fa-chevron-down';
      options.style.opacity = '0';
      options.style.transform = 'translateY(-10px)';
      closeTimer = window.setTimeout(() => {
        options.style.display = 'none';
      }, 300);
    };

    select.addEventListener('mouseenter', cancelClose);
    select.addEventListener('mouseleave', closeMenu);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindLanguageMenuAutoClose);
  } else {
    bindLanguageMenuAutoClose();
  }
})();
