---
title: 管理两期面板数据 | Stata
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
  <li><div><b>导入面板数据</b></div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span><span class="lnt">4
  </span><span class="lnt">5
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">cd "F:\General Database of Social Science\Courses\Courses Materials\波士顿学院\纵贯调查分析\数据"
  </span></span><span class="line"><span class="cl">use hrs_hours,clear
  </span></span><span class="line"><span class="cl">reshape long r@workhours80 r@poorhealth r@married r@totalpar  r@siblog h@childlg r@allparhelptw, i(hhid pn) j(wave)
  </span></span><span class="line"><span class="cl">tab wave
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><ul><li><div><b>导入面板数据</b></div></li></ul>

{{< stata >}}
cd "F:\General Database of Social Science\Courses\Courses Materials\波士顿学院\纵贯调查分析\数据"
use hrs_hours,clear
reshape long r@workhours80 r@poorhealth r@married r@totalpar  r@siblog h@childlg r@allparhelptw, i(hhid pn) j(wave)
tab wave
{{< /stata >}}

<ul><li><div><b>使用时点1和2做分析</b></div></li></ul>

{{< stata >}}
preserve
keep if wave < 3
xtset hhidpn wave
xtdes
{{< /stata >}}

<ul><li><div><b>查看面板数据的缺失值</b></div></li><li><div>查看时变变量（time-variant）的缺失值分布</div></li></ul>

{{< stata >}}
egen miss = rowmiss(rworkhours80 rpoorhealth rmarried rtotalpar rsiblog hchildlg rallparhelptw)
tab miss
drop if miss == 7

       miss |      Freq.     Percent        Cum.
------------+-----------------------------------
          0 |     11,327       85.93       85.93
          1 |      1,017        7.72       93.64
          2 |        115        0.87       94.52
          3 |         90        0.68       95.20
          4 |          7        0.05       95.25
          5 |          3        0.02       95.27
          6 |        364        2.76       98.04
          7 |        259        1.96      100.00
------------+-----------------------------------
      Total |     13,182      100.00
{{< /stata >}}

<ul><li><div><b>删除全部变量都缺失的个体</b></div></li><ul><li><div>有259个观测值7个变量全为缺失值</div></li></ul><li><div>根据公式<img data-filename="Image.png" src="%E7%AE%A1%E7%90%86%E4%B8%A4%E6%9C%9F%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%20%20Stata_files/Image.png" type="image/png"/>计算两期相关系数</div></li><ul><li><div>计算面板数据两期间的方差（within）和各期内方差（between）</div></li></ul></ul>

{{< stata >}}
drop if miss == 7
xtset hhidpn wave
xtdes

     Freq.  Percent    Cum. |  Pattern
---------------------------+---------
     6332     96.07   96.07 |  11
      259      3.93  100.00 |  1.
---------------------------+---------
     6591    100.00         |  XX

xtsum rworkhours80

Variable         |      Mean   Std. Dev.       Min        Max |    Observations
-----------------+--------------------------------------------+----------------
rwork~80 overall |  29.53971   22.79859          0         80 |     N =   12477
         between |             21.33473          0         80 |     n =    6580
         within  |             8.392351  -10.46029   69.53971 | T-bar =  1.8962

di 21.33473^2 / (21.33473^2 + 8.392351^2)
.86599838
{{< /stata >}}

<ul><li><div>类别变量在两期间的变化</div></li></ul>

{{< stata >}}
xttab rmarried


                  Overall             Between            Within
rmarried |    Freq.  Percent      Freq.  Percent        Percent
----------+-----------------------------------------------------
        0 |    2662     21.20      1532     23.24          92.13
        1 |    9895     78.80      5300     80.41          97.73
----------+-----------------------------------------------------
    Total |   12557    100.00      6832    103.66          96.47
                              (n = 6591)

注意： 
Between  中 80.41%两期内至少有一期结婚， 23.24至少有一期未婚。
within 中 97.73%表示对于两期任意一期结婚的人而言，两期平均的结婚概率
          92.13%表示对于两期任意一期未婚的人而言，两期平均的未婚概率
{{< /stata >}}

<ul><li><div>从个体角度看变化</div></li><ul><li><div>一开始未婚的个体，有92.85%始终未婚，有7.15%后来结婚</div></li><li><div>一开始结婚的个体，有96.76%始终已婚，有3.24%后来离婚</div></li></ul></ul>

{{< stata >}}
xttrans  rmarried, freq

           |       rmarried
  rmarried |         0          1 |     Total
-----------+----------------------+----------
         0 |     1,130         87 |     1,217
           |     92.85       7.15 |    100.00
-----------+----------------------+----------
         1 |       154      4,595 |     4,749
           |      3.24      96.76 |    100.00
-----------+----------------------+----------
     Total |     1,284      4,682 |     5,966
           |     21.52      78.48 |    100.00

di (1532*.9213+5300*.9773)/(1532+5300)
0.96474262

restore
{{< /stata >}}

<ul><li><div>从9期数据来看</div></li><ul><li><div>有4643个观测值的7个变量同时为缺失值</div></li></ul></ul>

{{< stata >}}
egen miss=rowmiss( rworkhours80 rpoorhealth rmarried rtotalpar rsiblog hchildlg rallparhelptw)
drop if miss==7
(4,643 observations deleted)
xtset  hhidpn wave
save hrs_hours_long.dta
{{< /stata >}}

<ul><li><div>呈现9期数据的模式类型</div></li><ul><li><div>有5540个的个体9期数据均无缺失</div></li><li><div>有154个个案从第3期开始缺失</div></li></ul></ul>

{{< stata >}}
for var rworkhours80 rpoorhealth rmarried rtotalpar rsiblog hchildlg rallparhelptw:xtsum X
for var rpoorhealth rmarried : xttab X

xtdes

     Freq.  Percent    Cum. |  Pattern
 ---------------------------+-----------
     5540     84.05   84.05 |  111111111
      154      2.34   86.39 |  11.......
      137      2.08   88.47 |  1........
       84      1.27   89.74 |  1111.....
       81      1.23   90.97 |  11111....
       73      1.11   92.08 |  11111111.
       69      1.05   93.13 |  111......
       55      0.83   93.96 |  1111111..
       49      0.74   94.70 |  111111...
      349      5.30  100.00 | (other patterns)
 ---------------------------+-----------
     6591    100.00         |  XXXXXXXXX
{{< /stata >}}

<ul><li><div><span style="font-weight: bold;">使用序列分析查看每个变量在不同个体不同期的分布</span></div></li><ul><li><div>选出观测值最多的5类序列</div></li></ul></ul>

{{< stata >}}
use hrs_hours,clear
reshape long r@workhours80 r@poorhealth r@married r@totalpar  r@siblog h@childlg r@allparhelptw, i(hhid pn) j(wave)
sqset rmarried hhidpn wave
sqtab,ranks(1/5)

Sequence-Pa |
      ttern |      Freq.     Percent        Cum.
------------+-----------------------------------
        1:9 |      2,283       67.15       67.15
        0:9 |        508       14.94       82.09
    1:3 .:6 |        209        6.15       88.24
      1 .:8 |        206        6.06       94.29
    1:2 .:7 |        194        5.71      100.00
------------+-----------------------------------
      Total |      3,400      100.00
{{< /stata >}}

<ul><li><div>观测值各个变量在不同期的变化</div></li></ul>

{{< stata >}}
preserve
keep if wave < 3
mean rworkhours80 rpoorhealth rmarried rtotalpar rsiblog hchildlg rallparhelptw,over(wave)

---------------------------------------------------------------
         Over |       Mean   Std. Err.     [95% Conf. Interval]
--------------+------------------------------------------------
rworkhours80  |
            1 |   30.61686   .2907706       30.0469    31.18682
            2 |   28.20681   .3175137      27.58442    28.82919
--------------+------------------------------------------------
rpoorhealth   |
            1 |   .1954613   .0051042      .1854562    .2054665
            2 |   .1988658   .0054884      .1881076     .209624
--------------+------------------------------------------------
rmarried      |
            1 |   .8189498   .0049563      .8092347    .8286649
            2 |   .8200378   .0052823      .8096836     .830392
--------------+------------------------------------------------
rtotalpar     |
            1 |   1.606427   .0098604      1.587099    1.625755
            2 |   1.405104   .0111955      1.383159    1.427049
--------------+------------------------------------------------
rsiblog       |
            1 |   1.673055   .0081439      1.657091    1.689018
            2 |   1.680897   .0086198      1.664001    1.697793
--------------+------------------------------------------------
hchildlg      |
            1 |   1.107862   .0070198      1.094102    1.121622
            2 |   1.118057   .0074358      1.103481    1.132632
--------------+------------------------------------------------
rallparhelptw |
            1 |   .6292256   .0373714      .5559711      .70248
            2 |   1.228155   .0464493      1.137107    1.319204
---------------------------------------------------------------
restore
{{< /stata >}}

<ul><li><div>生成不同期变量均值并制图</div></li></ul>

{{< stata >}}
egen mean_rwork = mean(rworkhours80), by(wave)
line mean_rwork wave, ytitle("Average hours of paid work") xtitle("Wave")
twoway scatter mean_rwork wave, ytitle("Average hours of paid work") xtitle("Wave")
{{< /stata >}}

<div><img data-filename="Graph.png" src="%E7%AE%A1%E7%90%86%E4%B8%A4%E6%9C%9F%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%20%20Stata_files/Graph.png" type="image/png" width="454"/></div><div><br/></div><div><br/></div></div><div><br/></div></span>
</div>
</div>
