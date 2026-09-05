---
title: 面板数据整理技巧 | Stata
date: '2023-06-07T17:25:00+08:00'
lastmod: '2023-06-07T17:25:00+08:00'
categories:
- 软件应用-Stata
tags:
- 软件应用-Stata
draft: false
summary: |-
  <div class="yinxiang-note stata-rich-summary">
  <ul>
  <li><div><span style="font-weight:700">面板数据整理</span></div></li>
  <li><div>巧用前一期或下一期的取值为当期负值</div></li>
  <li><div>注意[]一定要与by id: 连用</div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt"> 1
  </span><span class="lnt"> 2
  </span><span class="lnt"> 3
  </span><span class="lnt"> 4
  </span><span class="lnt"> 5
  </span><span class="lnt"> 6
  </span><span class="lnt"> 7
  </span><span class="lnt"> 8
  </span><span class="lnt"> 9
  </span><span class="lnt">10
  </span><span class="lnt">11
  </span><span class="lnt">12
  </span><span class="lnt">13
  </span><span class="lnt">14
  </span><span class="lnt">15
  </span><span class="lnt">16
  </span><span class="lnt">17
  </span><span class="lnt">18
  </span><span class="lnt">19
  </span><span class="lnt">20
  </span><span class="lnt">21
  </span><span class="lnt">22
  </span><span class="lnt">23
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">set obs 50
  </span></span><span class="line"><span class="cl">gen a = _n
  </span></span><span class="line"><span class="cl">gen year = 1991 if inrange(a,1,10)
  </span></span><span class="line"><span class="cl">replace year = 1993 if inrange(a,11,20)
  </span></span><span class="line"><span class="cl">replace year = 1995 if inrange(a,21,30)
  </span></span><span class="line"><span class="cl">replace year = 1997 if inrange(a,31,40)
  </span></span><span class="line"><span class="cl">replace year = 2000 if inrange(a,41,50)
  </span></span><span class="line"><span class="cl">gen c = uniform()
  </span></span><span class="line"><span class="cl">bys year:gen id = _n
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">drop a
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">xtset id year
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">*生成属性（来自下一轮）
  </span></span><span class="line"><span class="cl">by id: gen next = c[_n+1]
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">*生成属性（来自上一轮）
  </span></span><span class="line"><span class="cl">by id: gen back = c[_n-1]
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">*生成属性（来自第一轮）
  </span></span><span class="line"><span class="cl">by id: gen first = c[1]
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><div><ul><li><div><span style="font-weight: bold;">面板数据整理</span></div></li><ul><li><div>巧用前一期或下一期的取值为当期负值</div></li><li><div>注意[]一定要与by id: 连用</div></li></ul></ul>

{{< stata >}}
set obs 50
gen a = _n
gen year = 1991 if inrange(a,1,10)
replace year = 1993 if inrange(a,11,20)
replace year = 1995 if inrange(a,21,30)
replace year = 1997 if inrange(a,31,40)
replace year = 2000 if inrange(a,41,50)
gen c = uniform()
bys year:gen id = _n

drop a

xtset id year

*生成属性（来自下一轮）
by id: gen next = c[_n+1]

*生成属性（来自上一轮）
by id: gen back = c[_n-1]

*生成属性（来自第一轮）
by id: gen first = c[1]
{{< /stata >}}

<div><img data-filename="Image.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E6%95%B4%E7%90%86%E6%8A%80%E5%B7%A7%20%20Stata_files/Image.png" type="image/png"/></div><div><br/></div></div><ul><li><div><b>对相邻两期数据做差分，得到两期间的差分值</b></div></li></ul>

{{< stata >}}
sort id year
order id year

*未成立，原因未知
gen diff_1 = d.c

*成立
bys id : gen diff_2 = c-c[_n-1]

{{< /stata >}}

<div><br/></div>

{{< stata >}}
drop in 1
replace c = . in 3
replace c = . in 7
replace c = . in 10
drop in 9
replace c = . in 10
replace c = . in 17
{{< /stata >}}

<div><br/></div><div><img data-filename="Image.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E6%95%B4%E7%90%86%E6%8A%80%E5%B7%A7%20%20Stata_files/Image%20%5B1%5D.png" type="image/png"/></div>

{{< stata >}}
by id: replace c = c[_n-1] if !mi(c[_n-1])
{{< /stata >}}

<div><img data-filename="Image.png" src="%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E6%95%B4%E7%90%86%E6%8A%80%E5%B7%A7%20%20Stata_files/Image%20%5B2%5D.png" type="image/png"/></div><div><br/></div></div></span>
</div>
</div>
