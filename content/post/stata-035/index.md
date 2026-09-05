---
title: 异方差工具变量
date: '2023-06-07T17:24:00+08:00'
lastmod: '2023-06-07T17:24:00+08:00'
categories:
- 软件应用-Stata
tags:
- 软件应用-Stata
draft: false
summary: |-
  <div class="yinxiang-note stata-rich-summary">
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span><span class="lnt">4
  </span><span class="lnt">5
  </span><span class="lnt">6
  </span><span class="lnt">7
  </span><span class="lnt">8
  </span><span class="lnt">9
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">*用全部协变量生成IV
  </span></span><span class="line"><span class="cl">ivreg2h foodshare z_* (lrtotexp = ), robust
  </span></span><span class="line"><span class="cl">*用指定协变量生成IV
  </span></span><span class="line"><span class="cl">ivreg2h foodshare z_* (lrtotexp = ), robust z(z_age-z_twocars)
  </span></span><span class="line"><span class="cl">*用全部协变量生成IV，另加自己的IV
  </span></span><span class="line"><span class="cl">ivreg2h foodshare z_* (lrtotexp = lrinc), robust 
  </span></span><span class="line"><span class="cl">*用指定协变量生成IV，另加自己的IV
  </span></span><span class="line"><span class="cl">ivreg2h foodshare z_* (lrtotexp = lrinc), robust z(z_age-z_twocars)
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div><span><div><br/></div>

{{< stata >}}
*用全部协变量生成IV
ivreg2h foodshare z_* (lrtotexp = ), robust
*用指定协变量生成IV
ivreg2h foodshare z_* (lrtotexp = ), robust z(z_age-z_twocars)
*用全部协变量生成IV，另加自己的IV
ivreg2h foodshare z_* (lrtotexp = lrinc), robust 
*用指定协变量生成IV，另加自己的IV
ivreg2h foodshare z_* (lrtotexp = lrinc), robust z(z_age-z_twocars)
{{< /stata >}}

<div><br/></div></span>
</div>
</div>
