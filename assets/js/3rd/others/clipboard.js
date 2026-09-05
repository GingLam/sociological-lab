/* Site-level override of the NexT code-block toolbar plugin. */
NexT.plugins.others.clipboard = () => {
  const chromaDiv = document.querySelectorAll('div.highlight > .chroma');
  if (chromaDiv.length === 0) return;

  chromaDiv.forEach(element => {
    const codeblock = element.querySelector('code[class]:not([class=""])');
    if (!codeblock) return;

    const lang = codeblock.className;
    const copyBtn = document.createElement('div');
    copyBtn.classList.add('copy-btn');
    codeblock.parentNode.appendChild(copyBtn);

    element.addEventListener('mouseleave', () => {
      setTimeout(() => {
        copyBtn.classList.remove('copied', 'uncopied');
      }, 300);
    });

    const header = document.createElement('div');
    header.classList.add('code-header', lang);
    header.insertAdjacentHTML(
      'afterbegin',
      '<span class="code-lang"></span><span class="collapse-btn"></span>'
    );

    const collapseBtn = header.querySelector('.collapse-btn');
    if (element.scrollHeight > element.clientHeight + 10) {
      header.addEventListener('click', () => {
        element.classList.toggle('hidden-code');
        collapseBtn.classList.toggle('collapse');
      }, false);
    } else {
      header.style.cursor = 'default';
      collapseBtn.remove();
    }

    element.parentNode.insertBefore(header, element);
  });

  if (!NexT.CONFIG.copybtn || !NexT.CONFIG.page.clipboard) return;

  const clipboardJs = NexT.utils.getCDNResource(NexT.CONFIG.page.clipboard.js);
  NexT.utils.getScript(clipboardJs, () => {
    const clipboard = new ClipboardJS('.copy-btn', {
      text: trigger => trigger.previousElementSibling.textContent.trim()
    });

    clipboard.on('success', event => {
      event.clearSelection();
      event.trigger.classList.add('copied');
    });

    clipboard.on('error', event => {
      console.error('Copy failed:', event);
      event.trigger.classList.add('uncopied');
    });
  });
};
