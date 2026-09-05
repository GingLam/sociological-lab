/* Math render plugin */
NexT.plugins.others.math = function() {
  const render = NexT.CONFIG.page.math.render;

  if (render === 'mathjax') {
    const render_js = NexT.utils.getCDNResource(NexT.CONFIG.page.math.js);

    // 直接配置 MathJax，避免模板字符串二次解析时丢失反斜杠。
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        processEscapes: true
      },
      svg: {
        fontCache: 'global'
      },
      options: {
        skipHtmlTags: [
          'script', 'noscript', 'style', 'textarea', 'code', 'pre', 'footer'
        ]
      }
    };

    NexT.utils.getScript(render_js, {
      attributes: { id: 'MathJax-script', async: true }
    });
  }

  if (render === 'katex') {
    const render_css = NexT.utils.getCDNResource(NexT.CONFIG.page.math.css);
    NexT.utils.getStyle(render_css);
    const render_js_list = NexT.CONFIG.page.math.js;

    render_js_list.forEach(js => {
      const js_loader = NexT.utils.getScript(NexT.utils.getCDNResource(js));
      if (js.name === 'auto-render') {
        js_loader.then(function() {
          renderMathInElement(document.body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
          });
        });
      }
    });
  }
};
