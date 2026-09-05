---
title: DID的经典案例与应用
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
  <li><div><span style="font-weight:700">印度NREGS公共工程项目对农村低收入群体的影响</span></div></li>
  <li><div><a href="https://cjustincook.weebly.com/research.html">https://cjustincook.weebly.com/research.html</a></div></li>
  <li><div><span style="font-weight:700">NREGS项目的实施时间</span></div></li>
  <li><div>第一批：2006年2月，200个地区参与</div></li>
  <li><div>第二批：2007年4月，130个地区参与</div></li>
  <li><div>第三批：2008年4月，270个地区参与</div></li>
  <li><div><b>模型构造</b></div></li>
  <li><div><img data-filename="Image.png" src="DID%E7%9A%84%E7%BB%8F%E5%85%B8%E6%A1%88%E4%BE%8B%E4%B8%8E%E5%BA%94%E7%94%A8_files/Image.png" type="image/png"/></div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><ul><li><div><span style="font-weight: bold;">印度NREGS公共工程项目对农村低收入群体的影响</span></div></li><li><div><a href="https://cjustincook.weebly.com/research.html">https://cjustincook.weebly.com/research.html</a></div></li><li><div><span style="font-weight: bold;">NREGS项目的实施时间</span></div></li><ul><li><div>第一批：2006年2月，200个地区参与</div></li><li><div>第二批：2007年4月，130个地区参与</div></li><li><div>第三批：2008年4月，270个地区参与</div></li></ul><li><div><b>模型构造</b></div></li><ul><li><div><img data-filename="Image.png" src="DID%E7%9A%84%E7%BB%8F%E5%85%B8%E6%A1%88%E4%BE%8B%E4%B8%8E%E5%BA%94%E7%94%A8_files/Image.png" type="image/png"/></div></li><li><div>因变量stdy：</div></li><ul><li><div>2000-2013季度夜间灯光指数（标准化）、</div></li><li><div>2004-2013季度银行存款</div></li></ul><li><div>关键自变量NREGS：地区i在第t期是否实施公共政策</div></li><li><div>地区控制变量D</div></li><li><div>时间和州虚拟变量相乘 Y × S</div></li><li><div>控制变量：</div></li><ul><li><div>政策前趋势，夜间灯光2000-2005年增长率/银行存款2004-2005年增长率</div></li><li><div>其他政策项目的实施：RGGVY是否在地区i实施（从2005年开始，比NREGS早一年）</div></li><li><div>地区贫穷程度：包括1991年人口普查中该地区劣势种姓的比例、1996-1997年村民收入、1990-1993年农民平均产出</div></li></ul></ul></ul>

{{< stata >}}
cd "D:\Data Storages\Dataset for Learning"
use "district light panel.dta", clear
local control "i.year#c.wage i.year#c.outputwage i.year#c.state_frac"
eststo m1:reghdfe std_lt nregs, absorb(sno year#st) cluster(sno)
eststo m2:reghdfe std_lt nregs i.year#c.dlt00_05 i.year#i.rggvy, absorb(sno year#st) cluster(sno)
eststo m3:reghdfe std_lt nregs if wage!=., absorb(sno year#st) cluster(sno)
eststo m4:reghdfe std_lt nregs i.year#c.dlt00_05 i.year#i.rggvy if  wage!=., absorb(sno year#st) cluster(sno)
eststo m5:reghdfe std_lt nregs i.year#c.dlt00_05 i.year#i.rggvy `control', absorb(sno year#st) cluster(sno)
esttab m1 m2 m3 m4 m5,nogap keep(nregs)

--------------------------------------------------------------------------------------------
                      (1)             (2)             (3)             (4)             (5)   
                   std_lt          std_lt          std_lt          std_lt          std_lt   
--------------------------------------------------------------------------------------------
nregs              0.0558***       0.0559***       0.0503***       0.0531***       0.0330***
                   (6.43)          (6.72)          (5.31)          (6.04)          (3.35)   
--------------------------------------------------------------------------------------------
N                    8666            8666            6230            6230            6230   
--------------------------------------------------------------------------------------------
t statistics in parentheses
* p<0.05, ** p<0.01, *** p<0.001

{{< /stata >}}

<div><br/></div></div>

{{< stata >}}
local pre "i.year#c.wage i.year#c.outputwage i.year#c.state_frac"


gen wave1=nr06
gen wave2=nr07
gen wave3=nr08
tab year, gen(yr)


*store wave 1 results
forvalues i=1/14{
    gen w`i'=0 if wave1~=.
    replace w`i'=1 if wave1==1 & yr`i'==1
    gen x`i'=0 if wave2~=.
    replace x`i'=1 if wave2==1 & yr`i'==1
}


*omit 2006
replace w6=0 if wave1~=.
replace x6=0 if wave2~=.


*estimation
reghdfe std_lt w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 x1 x2 x3 x4 x5 x6 x7 x8 x9 x10 x11 x12 x13 x14, absorb(sno year#st) cluster(sno)


*store
estadd ysumm
eststo lights_w1


drop w1-w14 x1-x14


*store wave 2 results
forvalues i=1/14{
    gen w`i'=0 if wave2~=.
    replace w`i'=1 if wave2==1 & yr`i'==1
    gen x`i'=0 if wave1~=.
    replace x`i'=1 if wave1==1 & yr`i'==1
}


*omit 2006
replace w6=0 if wave2~=.
replace x6=0 if wave1~=.


*estimation
reghdfe std_lt  w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 x1 x2 x3 x4 x5 x6 x7 x8 x9 x10 x11 x12 x13 x14, absorb(sno year#st) cluster(sno)


*store
estadd ysumm
eststo lights_w2


*label years
forvalue i=1/14{
    local j = 1999+`i'
    label var w`i' "`j'"
}


set scheme s1mono
coefplot (lights_w1, label("Wave 1")) (lights_w2, label("Wave 2")), ///
    keep(w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14) vertical   ///
    ytitle(Coefficient on Wave*Year) ylabel(-.5(.1).5) xlabel(,labsize(small)) ///
    yline(0) levels(95) ciopts(lpattern(dash)) omitted baselevels      ///
    groups(w1 w2 w3 w4 w5 w6 = `""{bf:Pre-Rollout}" "(No Districts)""' ///
    w7 w8 w9 = `""{bf:Rollout}" "(Early Districts)""' w10 w11 w12 w13  ///
    w14 = `""{bf:Post-Rollout}" "(All Districts)""')
{{< /stata >}}

<div><br/></div></span>
</div>
</div>
