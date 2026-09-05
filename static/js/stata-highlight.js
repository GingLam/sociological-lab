import hljs from "./vendor/highlightjs/11.11.2/core.min.js";
import stata from "./vendor/highlightjs/11.11.2/stata.min.js";

hljs.registerLanguage('stata', stata);

/** 使用官方 Stata 词法器处理 Hugo 生成的纯文本代码节点。 */
function highlightStataBlocks() {
  document.querySelectorAll('code.language-stata').forEach((code) => {
    if (code.dataset.highlighted === 'yes') return;
    const result = hljs.highlight(code.textContent, {
      language: 'stata',
      ignoreIllegals: true
    });
    code.innerHTML = result.value;
    code.classList.add('hljs');
    code.dataset.highlighted = 'yes';
  });
}

// NexT 在 DOMContentLoaded 阶段创建标题栏；Stata 高亮随后执行，避免干扰其语言类检测。
if (document.readyState === 'complete') {
  highlightStataBlocks();
} else {
  window.addEventListener('load', highlightStataBlocks, { once: true });
}
