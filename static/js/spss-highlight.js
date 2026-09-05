import hljs from "./vendor/highlightjs/11.11.2/core.min.js";
import spss from "./vendor/highlightjs/11.11.2/spss.js";

hljs.registerLanguage("spss", spss);

/** 使用本站 SPSS 词法器处理 Hugo 生成的纯文本代码节点。 */
function highlightSpssBlocks() {
  document.querySelectorAll("code.language-spss").forEach((code) => {
    if (code.dataset.highlighted === "yes") return;
    const result = hljs.highlight(code.textContent, {
      language: "spss",
      ignoreIllegals: true
    });
    code.innerHTML = result.value;
    code.classList.add("hljs");
    code.dataset.highlighted = "yes";
  });
}

// NexT 先创建代码标题栏，再执行高亮，避免工具栏误判语言类名。
if (document.readyState === "complete") {
  highlightSpssBlocks();
} else {
  window.addEventListener("load", highlightSpssBlocks, { once: true });
}
