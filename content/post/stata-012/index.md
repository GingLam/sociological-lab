---
title: 面板数据可视化 | Stata
date: '2023-06-07T17:25:00+08:00'
lastmod: '2023-06-07T17:25:00+08:00'
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
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">cd "E:\Data Storages\Dataset for Learning\"
  </span></span><span class="line"><span class="cl">set scheme s1mono
  </span></span><span class="line"><span class="cl">use eg_simdata.dta, replace
  </span></span><span class="line"><span class="cl">panelview Y D , type(outcome) i(id) t(time) mycolor(Reds) discrete ytitle("haha my y title here") title("Discrete Outcome")
  </span></span></code></pre></td></tr></table></div></div>
  <div><img data-filename="Graph.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96%20%20Stata_files/Graph.png" type="image/png"/></div>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">use eg_turnout.dta, replace
  </span></span><span class="line"><span class="cl">panelview turnout policy_edr, type(treat) i(abb) t(year) mycolor(PuBu) bytiming prepost(off) ylabel("") title("How's bytiming working?")
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><br/></div>

{{< stata >}}
cd "E:\Data Storages\Dataset for Learning\"
set scheme s1mono
use eg_simdata.dta, replace
panelview Y D , type(outcome) i(id) t(time) mycolor(Reds) discrete ytitle("haha my y title here") title("Discrete Outcome")
{{< /stata >}}

<div><img data-filename="Graph.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96%20%20Stata_files/Graph.png" type="image/png"/></div>

{{< stata >}}
use eg_turnout.dta, replace
panelview turnout policy_edr, type(treat) i(abb) t(year) mycolor(PuBu) bytiming prepost(off) ylabel("") title("How's bytiming working?")
{{< /stata >}}

<div><img data-filename="Graph.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96%20%20Stata_files/Graph%20%5B1%5D.png" type="image/png"/></div>

{{< stata >}}
use eg_capacity.dta, replace
panelview lngdp demo ,type(treat) i(country) t(year) mycolor(Greens) prepost(off) ylabel("") xlabel("") title("hah")
{{< /stata >}}

<div><img data-filename="Graph.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96%20%20Stata_files/Graph%20%5B2%5D.png" type="image/png"/></div>

{{< stata >}}

{{< /stata >}}

<div><br/></div></span>
</div>
</div>
