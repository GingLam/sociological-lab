---
title: FE、TDFE、TD-FEGS | Stata
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
  <li><div><span style="font-weight:700">固定效应模型（FE）、时间分布固定效应模型（TDFE）与时间分布的组斜率固定效应模型（TD-FEGS）</span></div></li>
  <li><div>Rauf, T. (2020). Getting a Job, Again: New Evidence against Subjective Well-Being Scarring. <span style="font-style:italic">Social Forces</span>.</div></li>
  <li><div><a href="http://iras.lib.whu.edu.cn:8080/rwt/JOURNALS/https/MFSXC3DFNWVXGLUQPWZC6Z5QNF/sf/advance-article/doi/10.1093/sf/soaa086/5898214?searchresult=1#206937615">http://iras.lib.whu.edu.cn:8080/rwt/JOURNALS/https/MFSXC3DFNWVXGLUQPWZC6Z5QNF/sf/advance-article/doi/10.1093/sf/soaa086/5898214?searchresult=1#206937615</a></div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div><span><div><ul><li><div><span style="font-weight: bold;">固定效应模型（FE）、时间分布固定效应模型（TDFE）与时间分布的组斜率固定效应模型（TD-FEGS）</span></div></li><li><div>Rauf, T. (2020). Getting a Job, Again: New Evidence against Subjective Well-Being Scarring. <span style="font-style: italic;">Social Forces</span>.</div></li><ul><li><div><a href="http://iras.lib.whu.edu.cn:8080/rwt/JOURNALS/https/MFSXC3DFNWVXGLUQPWZC6Z5QNF/sf/advance-article/doi/10.1093/sf/soaa086/5898214?searchresult=1#206937615">http://iras.lib.whu.edu.cn:8080/rwt/JOURNALS/https/MFSXC3DFNWVXGLUQPWZC6Z5QNF/sf/advance-article/doi/10.1093/sf/soaa086/5898214?searchresult=1#206937615</a></div></li></ul><li><div><span style="font-weight: bold;">固定效应</span></div></li><ul><li><div><img data-filename="Image.png" src="FE%E3%80%81TDFE%E3%80%81TD-FEGS%20%20Stata_files/Image.png" type="image/png"/></div></li><li><div>固定效应模型的局限</div></li><ul><li><div>预设幸福感在每种雇佣状态下，随着时间推移具有同质性</div></li><li><div>由于存在对失业的负向期望效应（negative anticipatory effects），因此在失业来临前的平均幸福感是不同的。</div></li></ul></ul><li><div><span style="font-weight: bold;">时间分布固定效应模型</span><span style="font-weight: bold;">（TDFE）</span></div></li><ul><li><div><img data-filename="Image.png" src="FE%E3%80%81TDFE%E3%80%81TD-FEGS%20%20Stata_files/Image%20%5B1%5D.png" type="image/png"/></div></li><li><div>时间分布固定效应模型的优势</div></li><ul><li><div>允许干预效应随时间而不同</div></li><li><div>取代干预前、干预后的虚拟变量，采用衡量干预前时间到干预后时间的一组虚拟变量</div></li><li><div><img data-filename="Image.png" src="FE%E3%80%81TDFE%E3%80%81TD-FEGS%20%20Stata_files/Image%20%5B2%5D.png" type="image/png"/>指距离失业的一组指示时间距离（temporal distance）虚拟变量，q在失业前为负数，在失业后为正数</div></li></ul><li><div>time-distributed fixed-effects model (also known as an event study model).</div></li><li><div>时间分布的固定效应模型(也称为事件研究模型)</div></li><ul><li><div>Torche, F., &amp; Rauf, T. (2021). The Political Context and Infant Health in the United States. American Sociological Review, 86(3), 377-405.</div></li></ul><li><div>时间分布固定效应模型的局限</div></li><ul><li><div>仍然预设干预组与控制组存在相似的年龄-幸福感轨迹，即平行趋势（parallel trends），违反平行趋势预设将导致估计不一致</div></li></ul></ul><li><div><span style="font-weight: bold;">时间分布的组斜率固定效应模型</span><span style="font-weight: bold;">（TD-FEGS）</span></div></li><ul><li><div><img data-filename="Image.png" src="FE%E3%80%81TDFE%E3%80%81TD-FEGS%20%20Stata_files/Image%20%5B3%5D.png" type="image/png"/></div></li><ul><li><div>时间分布的组斜率固定效应模型</div></li><ul><li><div>允许干预组与控制组拥有不同的年龄-幸福感趋势</div></li><li><div>采用更弱的预设：干预组或控制组内拥有相同的年龄-幸福感趋势</div></li></ul></ul></ul></ul><div><br/></div>

{{< stata >}}
use http://www.stata-press.com/data/r16/nlswork.dta,clear
replace union = 0 if mi(union)
xtset idcode year
drop if mi(ln_wage, union, msp, tenure, year)
panelview ln_wage union , type( outcome ) i( idcode ) t( year ) mycolor(Reds) discrete
{{< /stata >}}

<div><img data-filename="Graph.png" src="FE%E3%80%81TDFE%E3%80%81TD-FEGS%20%20Stata_files/Graph.png" type="image/png"/><br/></div></div>

{{< stata >}}
bys idcode (year):gen serial = _n
{{< /stata >}}

<div><br/></div>

{{< stata >}}
eststo FE: xtreg ln_wage union msp tenure year, cluster(idcode) fe
eststo AREG: areg ln_wage union msp tenure year, absorb(idcode) vce(cluster idcode)
eststo TDFE: 
{{< /stata >}}

<div><br/></div></span>
</div>
</div>
