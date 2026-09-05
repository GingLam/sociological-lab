---
title: 分析两期面板数据 | Stata
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
  <li><div><b>导入并设置两期面板数据</b></div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span><span class="lnt">4
  </span><span class="lnt">5
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">cd "F:\General Database of Social Science\Courses\Courses Materials\波士顿学院\纵贯调查分析\数据"
  </span></span><span class="line"><span class="cl">use hrs_hours,clear
  </span></span><span class="line"><span class="cl">reshape long r@workhours80 r@poorhealth r@married r@totalpar  r@siblog h@childlg r@allparhelptw, i(hhid pn) j(wave)
  </span></span><span class="line"><span class="cl">keep if wave &lt; 3
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><div><ul><li><div><b>导入并设置两期面板数据</b></div></li></ul>

{{< stata >}}
cd "F:\General Database of Social Science\Courses\Courses Materials\波士顿学院\纵贯调查分析\数据"
use hrs_hours,clear
reshape long r@workhours80 r@poorhealth r@married r@totalpar  r@siblog h@childlg r@allparhelptw, i(hhid pn) j(wave)
keep if wave < 3
{{< /stata >}}

</div><ul><li><div><b>设置面板数据格式</b></div></li><li><div><b>两期面板数据分析的几种模型：</b></div></li><ul><li><div><img data-filename="Image.png" src="%E5%88%86%E6%9E%90%E4%B8%A4%E6%9C%9F%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%20%20Stata_files/Image.png" type="image/png" width="350"/></div></li></ul></ul>

{{< stata >}}
xtset hhidpn wave

*用滞后期Y解释当期Y
reg  rworkhours80 l.rworkhours80
est store m1
esttab m1,nogap

----------------------------
                      (1)   
             rworkhours80   
----------------------------
L.rworkho~80        0.737***
                  (79.38)   
_cons               5.340***
                  (15.03)   
----------------------------
N                    5897   
----------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><b>滞后因变量模型（lagged dependent variable model）</b></div></li></ul>

{{< stata >}}
reg  rworkhours80 l.rworkhours80 l.rallparhelptw
est store m2
esttab m2,nogap

----------------------------
                      (1)   
             rworkhours80   
----------------------------
L.rworkho~80        0.735***
                  (78.12)   
L.rallparh~w       -0.160*  
                  (-2.23)   
_cons               5.484***
                  (15.08)   
----------------------------
N                    5767   
----------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001

reg  rworkhours80 l.rworkhours80 l.rallparhelptw  l.rpoorhealth l.rmarried l.rtotalpar l.rsiblog  l.hchildlg raedyrs female age  minority
est store m3
esttab m1 m2 m3,nogap

------------------------------------------------------------
                      (1)             (2)             (3)   
             rworkhours80    rworkhours80    rworkhours80   
------------------------------------------------------------
L.rworkho~80        0.737***        0.735***        0.669***
                  (79.38)         (78.12)         (63.23)   
L.rallparh~w                       -0.160*        -0.0942   
                                  (-2.23)         (-1.28)   
L.rpoorhea~h                                       -4.444***
                                                  (-7.46)   
L.rmarried                                          0.421   
                                                   (0.69)   
L.rtotalpar                                         0.276   
                                                   (0.95)   
L.rsiblog                                          -0.420   
                                                  (-1.12)   
L.hchildlg                                         -0.522   
                                                  (-1.31)   
raedyrs                                             0.124   
                                                   (1.59)   
female                                             -3.393***
                                                  (-7.35)   
age                                                -0.781***
                                                 (-10.97)   
minority                                           -0.741   
                                                  (-1.39)   
_cons               5.340***        5.484***        52.53***
                  (15.03)         (15.08)         (11.98)   
------------------------------------------------------------
N                    5897            5767            5457   
------------------------------------------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><b>变成宽数据再分析</b></div></li></ul>

{{< stata >}}
drop _est_m1 _est_m2 _est_m3
reshape wide
reg  rworkhours802  rworkhours801  rallparhelptw1  rpoorhealth1 rmarried1 rtotalpar1 rsiblog1 hchildlg1 age minority female raedyrs
est store m4
esttab m4,nogap

----------------------------
                      (1)   
             rworkhou~802   
----------------------------
rworkhou~801        0.669***
                  (63.23)   
rallparhel~1      -0.0942   
                  (-1.28)   
rpoorhealth1       -4.444***
                  (-7.46)   
rmarried1           0.421   
                   (0.69)   
rtotalpar1          0.276   
                   (0.95)   
rsiblog1           -0.420   
                  (-1.12)   
hchildlg1          -0.522   
                  (-1.31)   
age                -0.781***
                 (-10.97)   
minority           -0.741   
                  (-1.39)   
female             -3.393***
                  (-7.35)   
raedyrs             0.124   
                   (1.59)   
_cons               52.53***
                  (11.98)   
----------------------------
N                    5457   
----------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><b>差分方法</b></div></li><ul><li><div>将因变量设置为两期差分值</div></li><li><div>差分方法一直受到批评。其中一个原因是它们被认为是不可靠的——如果时间1和时间2的因变量是正相关的(几乎总是如此) ，那么差分方法的可靠性就会低于单个时间点的可靠性，如果跨时间的相关性很高，那么可靠性的降低就会很多。</div></li><li><div>差分方法没有考虑到回归到平均效应的情况——在极低的初始分数之后，随之而来的是分数的增加和分数的降低。因此，初始水平可能会发生变化，但是如果我们将滞后因变量加入到差分方法中，我们就回到了 LDV 模型，所以这个策略是没有用的:</div></li></ul></ul>

{{< stata >}}
reshape long
gen diff= rworkhours80-l.rworkhours80
reg diff l.rallparhelptw
est store m1
reg  diff l.(rallparhelptw  rpoorhealth rmarried rtotalpar rsiblog hchildlg) raedyrs female age  minority
est store m2
esttab m1 m2,nogap

--------------------------------------------
                      (1)             (2)   
                     diff            diff   
--------------------------------------------
L.rallparh~w      -0.0147         -0.0267   
                  (-0.19)         (-0.34)   
L.rpoorhea~h                        0.264   
                                   (0.42)   
L.rmarried                          1.384*  
                                   (2.08)   
L.rtotalpar                        0.0907   
                                   (0.29)   
L.rsiblog                          -0.790   
                                  (-1.94)   
L.hchildlg                         -0.428   
                                  (-0.99)   
raedyrs                            -0.131   
                                  (-1.57)   
female                              1.381**
                                   (2.92)   
age                                -0.476***
                                  (-6.22)   
minority                           -0.578   
                                  (-1.00)   
_cons              -2.792***        25.22***
                 (-12.15)          (5.40)   
--------------------------------------------
N                    5767            5457   
--------------------------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><b>一阶差分方法</b></div></li><ul><li><div>将因变量和自变量设置为两期差分</div></li><li><div><span style="-en-paragraph:true;">一旦我们创建了一阶差分模型，我们能够引入时间不变的变量吗？</span></div></li><ul><li><div><span style="-en-paragraph:true;">可以; 我们假设这个时不变变量的影响随着时间的推移不稳定，并将结果系数解释为时间和变量的相互作用项。这将使我们能够评估这一时不变变量的影响随时间变化的情况，但我们无法在基线上对这一估计作出估计。</span></div></li></ul></ul></ul>

{{< stata >}}
for any poorhealth married totalpar siblog allparhelptw: gen Xdiff=rX-l.rX
for any childlg: gen Xdiff=hX-l.hX
reg  diff allparhelptwdiff poorhealthdiff marrieddiff totalpardiff siblogdiff childlgdiff
est store m3

reg  diff allparhelptwdiff poorhealthdiff marrieddiff totalpardiff siblogdiff childlgdiff raedyrs female age minority
est store m4
esttab m3 m4,nogap

--------------------------------------------
                      (1)             (2)   
                     diff            diff   
--------------------------------------------
allparhelp~f      -0.0796         -0.0779   
                  (-1.33)         (-1.31)   
poorhealth~f       -2.450***       -2.417***
                  (-3.61)         (-3.56)   
marrieddiff        -0.890          -0.790   
                  (-0.65)         (-0.58)   
totalpardiff        0.572           0.430   
                   (1.16)          (0.87)   
siblogdiff         -1.649          -1.740   
                  (-0.57)         (-0.60)   
childlgdiff         1.416           1.101   
                   (0.85)          (0.67)   
raedyrs                           -0.0944   
                                  (-1.18)   
female                              1.263**
                                   (2.68)   
age                                -0.454***
                                  (-5.97)   
minority                           -0.936   
                                  (-1.64)   
_cons              -2.516***        23.36***
                  (-9.67)          (5.28)   
--------------------------------------------
N                    5229            5227   
--------------------------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<div><br/></div></div><div><br/></div></span>
</div>
</div>
