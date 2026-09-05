---
title: 固定效应模型评估非对称效应 | Stata
date: '2023-06-07T17:24:00+08:00'
lastmod: '2023-06-07T17:24:00+08:00'
categories:
- 软件应用-Stata
tags:
- 软件应用-Stata
draft: false
summary: |-
  <div class="yinxiang-note stata-rich-summary">
  <ul>
  <li><div>Allison, P. D. (2019). Asymmetric fixed-effects models for panel data. Socius, 5, 2378023119826441.</div></li>
  <li><div><a href="https://journals.sagepub.com/doi/10.1177/2378023119826441">https://journals.sagepub.com/doi/10.1177/2378023119826441</a></div></li>
  <li><div><span style="font-weight:700">R package</span></div></li>
  <li><div>panelr：<a href="https://cran.r-project.org/web/packages/panelr/panelr.pdf">https://cran.r-project.org/web/packages/panelr/panelr.pdf</a></div></li>
  <li><div><a href="https://jacob-long.com/">https://jacob-long.com/</a></div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div><span><div><ul><li><div>Allison, P. D. (2019). Asymmetric fixed-effects models for panel data. Socius, 5, 2378023119826441.</div></li><li><div><a href="https://journals.sagepub.com/doi/10.1177/2378023119826441">https://journals.sagepub.com/doi/10.1177/2378023119826441</a></div></li><li><div><span style="font-weight: bold;">R package</span></div></li><ul><li><div>panelr：<a href="https://cran.r-project.org/web/packages/panelr/panelr.pdf">https://cran.r-project.org/web/packages/panelr/panelr.pdf</a></div></li><li><div><a href="https://jacob-long.com/">https://jacob-long.com/</a></div></li></ul><li><div><span style="font-weight: bold;">Stanley Liberson在Making It Count，说明定量研究中的因果关系预设是对称型（symmetric）</span></div></li><ul><li><div>如果变量x的单位增加引起y的单位增加b，那么x的单位减少引起y的单位减少b</div></li><li><div>这一个预设是不可靠的：结婚时幸福感的增加与离婚时幸福感的减少是不一致的。</div></li></ul><li><div><span style="font-weight: bold;">York &amp; Light（2017）提出新方法：</span></div></li><ul><li><div>基于面板数据</div></li><li><div>计算所有时变变量的一阶差分，包括自变量和因变量</div></li><li><div>将一阶差分分解为正负成份</div></li><li><div>用分解后的变量，替代原始变量，估计一阶差分回归模型</div></li></ul><li><div><b>重要案例</b></div></li><ul><li><div>Manzoni, A., &amp; Gebel, M. (2023). Young adults’ labour market transitions and intergenerational support in Germany. <span style="font-style: italic;">European Sociological Review</span>, jcad006.</div></li></ul></ul>

{{< stata >}}
cd "E:/Research Program/OneDrive - whu.edu.cn/Paul D. Allison/Asymmetric Fixed-effects Models/"
use "nlsy.dta", clear
gen antidiff=anti92-anti90
gen selfdiff=self92-self90
gen povdiff=pov92-pov90
eststo m1:reg antidiff selfdiff povdiff

gen selfpos=selfdiff*(selfdiff>0)
gen selfneg=-selfdiff*(selfdiff<0)
gen povpos=povdiff*(povdiff>0)
gen povneg=-povdiff*(povdiff<0)
eststo m2:reg antidiff selfpos selfneg povpos povneg

esttab m1 m2,nogap se

--------------------------------------------
                      (1)             (2)   
                 antidiff        antidiff   
--------------------------------------------
selfdiff          -0.0391**                 
                 (0.0136)                   
povdiff             0.197                   
                  (0.133)                   
selfpos                          -0.00484   
                                 (0.0252)   
selfneg                            0.0743**
                                 (0.0257)   
povpos                              0.250   
                                  (0.200)   
povneg                             -0.126   
                                  (0.192)   
_cons              0.0403         -0.0750   
                 (0.0534)        (0.0864)   
--------------------------------------------
N                     581             581   
--------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><span style="font-weight: bold;">检验正负效应的绝对量是否相等</span></div></li><ul><li><div>自尊心和贫困增加及减少对反社会行为的影响效应量无显著差异</div></li></ul></ul>

{{< stata >}}
test selfpos=-selfneg

( 1)  selfpos + selfneg = 0

       F(  1,   576) =    2.63
            Prob > F =    0.1057

test povpos=-povneg

( 1)  povpos + povneg = 0

       F(  1,   576) =    0.18
            Prob > F =    0.6688
{{< /stata >}}

<ul><li><div><span style="font-weight: bold;">拓展到多期面板数据</span></div></li><ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">平衡面板</span></div></li><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">经典对称模型</span></span></div></li></ul></ul>

{{< stata >}}
use "wagerate.dta", clear
gen id = _n
reshape long lwage mar edu urb, i(id) j(year)
xtset id year
*对称模型
eststo m3: xtreg lwage mar edu urb i.year, fe r

eststo m4:reg d.lwage d.mar d.edu d.urb i.year, cluster(id)
***Table 5, right panel
eststo m5:xtreg d.lwage d.mar d.edu d.urb i.year, fe robust
***Table 6, left panel
eststo m6:mixed d.lwage d.mar d.edu d.urb i.year || id:, nocon res(uns,t(year)) stddev robust
***Table 7, right panel
eststo m7:mixed d.lwage d.mar d.edu d.urb i.year || id:, nocon res(toeplitz1,t(year)) stddev robust

esttab m3 m4 m5 m6 m7 ,nogap se
{{< /stata >}}

<ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">非对称模型拓展：线性模型</span></div></li><li><div><span style="font-weight: bold;">正成份：累积到时间点t的正变化</span></div></li><li><div><span style="font-weight: bold;">负成份：</span><span style="font-weight: bold;">累积到时间点t的负变化</span></div></li></ul>

{{< stata >}}
use "wagerate.dta", clear
gen id = _n
reshape long lwage mar edu urb, i(id) j(year)
xtset id year
gen mardiff=d.mar
gen urbdiff=d.urb
*如果两期间无变化，取0
replace mardiff=0 if mardiff==.
replace urbdiff=0 if urbdiff==.
*设置正负成份
gen marpos=mardiff*(mardiff>0)
gen marneg=-mardiff*(mardiff<0)
gen urbpos=urbdiff*(urbdiff>0)
gen urbneg=-urbdiff*(urbdiff<0)
*计算累积正分成份
bysort id (year): gen marcumpos = sum(marpos)
bysort id (year): gen marcumneg = sum(marneg)
bysort id (year): gen urbcumpos = sum(urbpos)
bysort id (year): gen urbcumneg = sum(urbneg)

eststo m1: xtreg lwage marcumpos marcumneg urbcumpos urbcumneg edu i.year, fe robust
{{< /stata >}}

<ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">非对称模型拓展：非线性模型</span></div></li><li><div><span style="font-weight: bold;">正成份：累积到时间点t的正变化</span></div></li><li><div><span style="font-weight: bold;">负成份：累积到时间点t的负变化</span></div></li></ul>

{{< stata >}}
use "teenyrs5.dta", clear
xtset id year
clogit pov mother spouse inschool hours i.year, group(id) robust
gen spousediff=d.spouse
gen inschooldiff=d.inschool
gen hoursdiff=d.hours
replace spousediff=0 if spousediff==.
replace inschooldiff=0 if inschooldiff==.
replace hoursdiff=0 if hoursdiff==.
gen spousepos=spousediff*(spousediff>0)
gen spouseneg=-spousediff*(spousediff<0)
gen inschoolpos=inschooldiff*(inschooldiff>0)
gen inschoolneg=-inschooldiff*(inschooldiff<0)
gen hourspos=hoursdiff*(hoursdiff>0)
gen hoursneg=-hoursdiff*(hoursdiff<0)
bysort id (year): gen spousecumpos=sum(spousepos)
bysort id (year): gen spousecumneg=sum(spouseneg)
bysort id (year): gen inschoolcumpos=sum(inschoolpos)
bysort id (year): gen inschoolcumneg=sum(inschoolneg)
bysort id (year): gen hourscumpos=sum(hourspos)
bysort id (year): gen hourscumneg=sum(hoursneg)
eststo m2:clogit pov mother spousecumpos spousecumneg inschoolcumpos inschoolcumneg hourscumpos hourscumneg i.year, group(id) robust
{{< /stata >}}

<div><br/></div></div><div><br/></div></span>
</div>
</div>
