---
title: TSCS数据的反事实估计｜Stata
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
  <li><div>FECT：实现对TSCS数据的反事实估计</div></li>
  <li><div>固定效应模型（fixed effect）</div></li>
  <li><div>交互固定效应模型（interactive fixed effects）</div></li>
  <li><div>矩阵完成模型（matrix completion model）</div></li>
  <li><div>单元指定样条模型（unit-specific bsplines）</div></li>
  <li><div>单元指定时间趋势模型（unit-specific time trends）</div></li>
  <li><div>FECT相比于双向固定效应模型的优势</div></li>
  <li><div>当干预效应存在异质性或存在不可观测时变混淆变量时，提供更可靠的因果估计</div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div><span style="font-size: 14px;"><ul><li><div>FECT：实现对TSCS数据的反事实估计</div></li><ul><li><div>固定效应模型（fixed effect）</div></li><li><div>交互固定效应模型（interactive fixed effects）</div></li><li><div>矩阵完成模型（matrix completion model）</div></li><li><div>单元指定样条模型（unit-specific bsplines）</div></li><li><div>单元指定时间趋势模型（unit-specific time trends）</div></li></ul><li><div>FECT相比于双向固定效应模型的优势</div></li><ul><li><div>当干预效应存在异质性或存在不可观测时变混淆变量时，提供更可靠的因果估计</div></li></ul><li><div>可以计算ATT和时期特定ATT（period-specific ATT）</div></li><li><div>提供安慰剂检验（placebo test）和等效性检验（equivalence test）</div></li><li><div>干预变量必须是二分变量</div></li><li><div><a href="https://yiqingxu.org/packages/fect/stata/fect_md.html">https://yiqingxu.org/packages/fect/stata/fect_md.html</a></div></li><li><div>Liu, L., Wang, Y., &amp; Xu, Y. (2021). A practical guide to counterfactual estimators for causal inference with time-series cross-sectional data. <span style="font-style: italic;">arXiv preprint arXiv:2107.00856</span>.</div></li></ul><div><br/></div><ul><li><div>传统线性双向固定效应模型的局限</div></li><ul><li><div>在时间序列横截面</div></li></ul></ul><div><br/></div>

{{< stata >}}
cd "/Users/ginglam/OneDrive - whu.edu.cn/02_Data_Storages/Dataset for Learning”
eststo m1:reg Y D X1 X2
esttab m1, nogap se
----------------------------
                      (1)   
                        Y   
----------------------------
D                   11.58***
                  (0.194)   
X1                  0.988***
                 (0.0654)   
X2                  2.976***
                 (0.0644)   
_cons               10.04***
                 (0.0695)   
----------------------------
N                    7000   
----------------------------

fect Y, treat(D) unit(id) time(time) cov(X1 X2) method("fe") force(“none”)
mat list e(ATT)

e(ATT)[1,2]
          ATT          N
r1  11.580523        900
{{< /stata >}}

<div><a href="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/Attachment.pdf"><img alt="Attachment.pdf" src="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/7d7d4e89f0dfd8141081781ec093ffc9.png"/></a></div>

{{< stata >}}
xtset id time
eststo m2: xtreg Y D X1 X2,fe
esttab m2, nogap se
----------------------------
                      (1)   
                        Y   
----------------------------
D                   9.045***
                  (0.175)   
X1                  0.972***
                 (0.0530)   
X2                  3.007***
                 (0.0521)   
_cons               10.37***
                 (0.0565)   
----------------------------
N                    7000   
----------------------------

fect Y, treat(D) unit(id) time(time) cov(X1 X2) method("fe") force("unit”)
mat list e(ATT)

e(ATT)[1,2]
          ATT          N
r1  9.2511047        900
{{< /stata >}}

<div><a href="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/Attachment.pdf"><img alt="Attachment.pdf" src="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/14a378110dbcc131e811711f6e299c44.png"/></a></div>

{{< stata >}}
eststo m3: xtreg Y D X1 X2 i.time,fe
esttab m3, nogap se keep(D X1 X2)
----------------------------
                      (1)   
                        Y   
----------------------------
D                   3.099***
                  (0.147)   
X1                  0.959***
                 (0.0360)   
X2                  3.055***
                 (0.0354)   
----------------------------
N                    7000   
----------------------------

fect Y, treat(D) unit(id) time(time) cov(X1 X2) method("fe") force("two-way”)
mat list e(ATT)

e(ATT)[1,2]
          ATT          N
r1  3.4890777        900
{{< /stata >}}

<div><a href="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/Attachment.pdf"><img alt="Attachment.pdf" src="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/219aad5aa8fdc9769e68884877576816.png"/></a></div><ul><li><div>等效性检验（equivalence test）</div></li><ul><li><div>通过等效性检验判断识别假设（identification assumption）是否有效</div></li><li><div>只适用于 fe, ife, mc, bspline, polynomial and both.</div></li></ul></ul>

{{< stata >}}
fect Y,  treat(D) unit(id) time(time) cov(X1 X2) se method("fe") preperiod(-25) offperiod(0) equiTest nboots(100)
{{< /stata >}}

<div><a href="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/Attachment.pdf"><img alt="Attachment.pdf" src="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/73bcbdf7b9076bdeec18e9ba0996718d.png"/></a><br/></div><ul><li><div>安慰剂检验（placebo test）</div></li><ul><li><div>提供安慰剂检验，减轻对前趋势过拟合的担忧（concern of over-fitting in the pre-trend）</div></li><li><div>在placeboperiod ()指定干预前的范围作为安慰剂周期</div></li></ul></ul>

{{< stata >}}
fect Y,  treat(D) unit(id) time(time) cov(X1 X2) se method("fe") placeboTest nboots(100)
{{< /stata >}}

<div><a href="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/Attachment.pdf"><img alt="Attachment.pdf" src="TSCS%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%8D%E4%BA%8B%E5%AE%9E%E4%BC%B0%E8%AE%A1%EF%BD%9CStata_files/2801dab3528121043615b47f17f3a8d3.png"/></a><br/></div><div><br/></div></span>
</div>
</div>
