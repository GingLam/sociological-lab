---
title: 增长曲线模型 | Stata
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
  <li><div><a href="https://data.princeton.edu/pop510/oxboys">https://data.princeton.edu/pop510/oxboys</a></div></li>
  <li><div>Growth Curve Model</div></li>
  <li><div>dep：抑郁症得分</div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span><span class="lnt">4
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">use "D:\Data Storages\Dataset for Learning\depression_clean.dta", clear
  </span></span><span class="line"><span class="cl">reshape long dep, i(sid) j(time)
  </span></span><span class="line"><span class="cl">mixed dep time || sid:time, var cov(unstr)
  </span></span></code></pre></td></tr></table></div></div>
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
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">         dep |      Coef.   Std. Err.      z    P&gt;|z|     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-------------+----------------------------------------------------------------
  </span></span><span class="line"><span class="cl">        time |    -1.6025   .4262612    -3.76   0.000    -2.437957   -.7670434
  </span></span><span class="line"><span class="cl">       _cons |   14.18924   .8147121    17.42   0.000     12.59243    15.78605
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">  Random-effects Parameters  |   Estimate   Std. Err.     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-----------------------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">sid: Unstructured            |
  </span></span><span class="line"><span class="cl">                   var(time) |   3.201386   2.047798      .9138158    11.21547
  </span></span><span class="line"><span class="cl">                  var(_cons) |   21.93819   6.613945       12.1501    39.61154
  </span></span><span class="line"><span class="cl">             cov(time,_cons) |  -1.153612   2.751286     -6.546034     4.23881
  </span></span><span class="line"><span class="cl">-----------------------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">               var(Residual) |    10.3135    2.15051      6.853596    15.52006
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">LR test vs. linear model: chi2(3) = 54.85                 Prob &gt; chi2 = 0.0000
  </span></span><span class="line"><span class="cl">
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><ul><li><div><a href="https://data.princeton.edu/pop510/oxboys">https://data.princeton.edu/pop510/oxboys</a></div></li><li><div>Growth Curve Model</div></li><ul><li><div>dep：抑郁症得分</div></li></ul></ul>

{{< stata >}}
use "D:\Data Storages\Dataset for Learning\depression_clean.dta", clear
reshape long dep, i(sid) j(time)
mixed dep time || sid:time, var cov(unstr)
{{< /stata >}}

<div><br/></div>

{{< stata >}}
------------------------------------------------------------------------------
         dep |      Coef.   Std. Err.      z    P>|z|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
        time |    -1.6025   .4262612    -3.76   0.000    -2.437957   -.7670434
       _cons |   14.18924   .8147121    17.42   0.000     12.59243    15.78605
------------------------------------------------------------------------------


------------------------------------------------------------------------------
  Random-effects Parameters  |   Estimate   Std. Err.     [95% Conf. Interval]
-----------------------------+------------------------------------------------
sid: Unstructured            |
                   var(time) |   3.201386   2.047798      .9138158    11.21547
                  var(_cons) |   21.93819   6.613945       12.1501    39.61154
             cov(time,_cons) |  -1.153612   2.751286     -6.546034     4.23881
-----------------------------+------------------------------------------------
               var(Residual) |    10.3135    2.15051      6.853596    15.52006
------------------------------------------------------------------------------
LR test vs. linear model: chi2(3) = 54.85                 Prob > chi2 = 0.0000

{{< /stata >}}

<div><br/></div>

{{< stata >}}
reshape wide
sem (dep0 <- I@1 S@0 _cons@0) (dep1 <- I@1 S@1 _cons@0)(dep2 <- I@1 S@2 _cons@0),var(e.dep0@var e.dep1@var e.dep2@var) means(I S)
{{< /stata >}}

<div><br/></div>

{{< stata >}}
-------------+----------------------------------------------------------------
      mean(I)|   14.18924    .814712    17.42   0.000     12.59243    15.78605
      mean(S)|    -1.6025   .4262611    -3.76   0.000    -2.437956   -.7670436
-------------+----------------------------------------------------------------
  var(e.dep0)|    10.3135   2.150514                      6.853595    15.52008
  var(e.dep1)|    10.3135   2.150514                      6.853595    15.52008
  var(e.dep2)|    10.3135   2.150514                      6.853595    15.52008
       var(I)|   21.93818   6.613939                      12.15009    39.61152
       var(S)|    3.20138   2.047803                       .913809    11.21551
-------------+----------------------------------------------------------------
     cov(I,S)|  -1.153606   2.751291    -0.42   0.675    -6.546037    4.238825
------------------------------------------------------------------------------
LR test of model vs. saturated: chi2(3)   =     21.79, Prob > chi2 = 0.0001
{{< /stata >}}

<div><br/></div></div><div><br/></div></span>
</div>
</div>
