---
title: Mundlak Model, Chamberlain Model & Hybrid Model | Stata
date: '2023-06-07T17:24:00+08:00'
lastmod: '2023-06-07T17:24:00+08:00'
categories:
- 软件应用-Stata
tags:
- 软件应用-Stata
draft: false
summary: |-
  <div class="yinxiang-note stata-rich-summary">
  <div><span style="font-weight:700">Mundlak Model, Chamberlain Model &amp; Hybrid Model </span></div>
  <div>蒙德拉克模型、张伯伦模型和混合模型</div>
  <ul>
  <li><div><span style="font-weight:700">Hybrid 模型是Allison在2009年提出的分解聚类内（within-cluster）和聚类间（between-cluster）效应的方法</span></div></li>
  <li><div>Hybrid方法又称为对中随机效应模型（the centered Random Effect Model）</div></li>
  <li><div>Firebaugh, G., Warner, C., &amp; Massoglia, M. (2013). Fixed effects, random effects, and hybrid models for causal analysis. In <span style="font-style:italic">Handbook of causal analysis for social research</span> (pp. 113-132). Springer, Dordrecht.</div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div><span><div><span style="font-weight: bold;">Mundlak Model, Chamberlain Model &amp; Hybrid Model </span></div><div>蒙德拉克模型、张伯伦模型和混合模型</div><ul><li><div><span style="font-weight: bold;">Hybrid 模型是Allison在2009年提出的分解聚类内（within-cluster）和聚类间（between-cluster）效应的方法</span></div></li><ul><li><div>Hybrid方法又称为对中随机效应模型（the centered Random Effect Model）</div></li><ul><li><div>Firebaugh, G., Warner, C., &amp; Massoglia, M. (2013). Fixed effects, random effects, and hybrid models for causal analysis. In <span style="font-style: italic;">Handbook of causal analysis for social research</span> (pp. 113-132). Springer, Dordrecht.</div></li></ul><li><div>Hybrid模型的本质</div></li><ul><li><div>固定效应模型可以通过每个聚类围绕其平均值对中（centering）来估计</div></li><li><div>随机效应模型也可以采取同样的对中方式来估计</div></li><li><div>对中随机效应模型具有与固定效应模型同等的消除非时变原因的效果，比固定效应模型更为灵活 </div></li><li><div>在多层次模型中，减去聚类内均值的做法称为“组均值对中（group-mean centering）” (Raudenbush and Bryk 2002)</div></li></ul><li><div><img data-filename="image.png" src="Mundlak%20Model%2C%20Chamberlain%20Model%20%26%20Hybrid%20Mod_files/Image.png" type="image/png"/></div></li><li><div>其中βw是聚类内效应（with-cluster effect），βB是聚类间效应（between-cluster effect）</div></li></ul><li><div><span style="font-weight: bold;">Mundlak是最早将面板数据引入经济学分析的计量经济学家</span></div></li><ul><li><div>Mundlak模型又称为相关随机效应模型（correlated random-effect model）</div></li><li><div>Mundlak模型与Hybrid model在代数上是完全等价的</div></li><li><div><img data-filename="image.png" src="Mundlak%20Model%2C%20Chamberlain%20Model%20%26%20Hybrid%20Mod_files/Image%20%5B1%5D.png" type="image/png"/></div></li></ul><li><div><span style="font-weight: bold;">Hybrid模型转为Mundlak模型</span></div></li><ul><li><div><img data-filename="image.png" src="Mundlak%20Model%2C%20Chamberlain%20Model%20%26%20Hybrid%20Mod_files/image%20%5B2%5D.png" type="image/png"/></div></li></ul><li><div><span style="font-weight: bold;">比较OLS、固定效应、随机效应、Mundlak模型和Hybrid模型</span></div></li><ul><li><div>Hybrid模型和Mundlak模型的基本思想，是限制ui与层一协变量之间的相依性（dependency）</div></li><li><div>在线性案例中，Hybrid模型或Mundlak模型所估计的聚类内效应等同于固定效应模型，即</div></li><ul><li><div><img data-filename="image.png" src="Mundlak%20Model%2C%20Chamberlain%20Model%20%26%20Hybrid%20Mod_files/image%20%5B3%5D.png" type="image/png"/></div></li></ul></ul></ul>

{{< stata >}}
use "/Users/ginglam/Library/CloudStorage/OneDrive-whu.edu.cn/02_Data_Storages/Dataset for Learning/wages.dta"

xtset id t
bysort id: egen mean_exp = mean(exp)
bysort id: egen mean_union = mean(union)
gen d_exp = exp - mean_exp
gen d_union = union - mean_union

eststo ols:reg lwage fem ed exp union
eststo fe:xtreg lwage fem ed exp union,fe vce(robust)
eststo re:xtreg lwage fem ed exp union,re vce(robust)
eststo mundlak:xtreg lwage fem ed exp union mean_exp mean_union,vce(robust)
eststo mundlak2:mundlak lwage fem ed exp union,se
eststo hybrid: xtreg lwage fem ed d_exp d_union mean_exp mean_union,vce(robust)
eststo hybrid2:mundlak lwage fem ed exp union,se hybrid
eststo hybrid3:xthybrid lwage fem ed exp union, clusterid(id) vce(cluster id) family(gaussian) se
esttab ols fe re mundlak mundlak2 hybrid hybrid2 hybrid3, nogap se mtitles(ols fe re mundlak mundlak2 hybrid hybrid2 hybrid3)

--------------------------------------------------------------------------------------------------------------------------------------------
                      (1)            (2)            (3)            (4)            (5)            (6)            (7)            (8) 
                      ols              fe              re        mundlak        mundlak2          hybrid        hybrid2        hybrid3 
--------------------------------------------------------------------------------------------------------------------------------------------
main                                                                                                                                       
fem                -0.421***            0          -0.296***      -0.430***      -0.430***      -0.430***      -0.430***               
                (0.0186)            (.)        (0.0725)        (0.0366)        (0.0396)        (0.0366)        (0.0396)                 
ed                0.0793***            0          0.113***      0.0768***      0.0768***      0.0768***      0.0768***               
                (0.00221)            (.)      (0.00816)      (0.00493)      (0.00474)      (0.00493)      (0.00474)                 
exp                0.0119***      0.0969***      0.0525***      0.0969***      0.0969***                                               
              (0.000545)      (0.00177)      (0.00164)      (0.00177)      (0.00119)                                                 
union              0.0848***      0.0319          0.0552*        0.0319          0.0319*                                                 
                (0.0126)        (0.0262)        (0.0267)        (0.0262)        (0.0149)                                                 
mean_exp                                                          -0.0881***                      0.00877***                               
                                                                (0.00206)                      (0.00133)                                 
mean_union                                                        0.0564                          0.0883***                               
                                                                (0.0376)                        (0.0267)                                 
mean__exp                                                                        -0.0881***                      0.00877***               
                                                                                (0.00168)                      (0.00118)                 
mean__union                                                                        0.0564                          0.0883**               
                                                                                (0.0323)                        (0.0286)                 
d_exp                                                                                              0.0969***                               
                                                                                                (0.00177)                                 
d_union                                                                                            0.0319                                 
                                                                                                (0.0262)                                 
diff__exp                                                                                                          0.0969***               
                                                                                                                (0.00119)                 
diff__union                                                                                                        0.0319*                 
                                                                                                                (0.0149)                 
R__fem                                                                                                                            -0.430***
                                                                                                                                (0.0365) 
R__ed                                                                                                                              0.0768***
                                                                                                                                (0.00492) 
W__exp                                                                                                                            0.0969***
                                                                                                                                (0.00177) 
W__union                                                                                                                          0.0319 
                                                                                                                                (0.0262) 
B__exp                                                                                                                            0.00877***
                                                                                                                                (0.00133) 
B__union                                                                                                                          0.0883***
                                                                                                                                (0.0267) 
_cons              5.439***        4.741***        4.199***        5.532***        5.532***        5.532***        5.532***        5.532***
                (0.0346)        (0.0355)        (0.118)        (0.0790)        (0.0747)        (0.0790)        (0.0747)        (0.0789) 
--------------------------------------------------------------------------------------------------------------------------------------------
var(_cons[~)                                                                                                                               
_cons                                                                                                                              0.0866***
                                                                                                                                (0.00523) 
--------------------------------------------------------------------------------------------------------------------------------------------
var(e.lwage)                                                                                                                               
_cons                                                                                                                              0.0235***
                                                                                                                                (0.00237) 
--------------------------------------------------------------------------------------------------------------------------------------------
N                    4165            4165            4165            4165            4165            4165            4165            4165 
--------------------------------------------------------------------------------------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><span style="font-weight: bold;">Mundlak在1978年提出替代Hausman test的方法</span></div></li></ul>

{{< stata >}}
estimate restore mundlak

test mean_exp mean_union

( 1)  mean_exp = 0
( 2)  mean_union = 0


          chi2(  2) = 1828.42
        Prob > chi2 =    0.0000
{{< /stata >}}

<ul><li><div>以上结果拒绝零假设。这表明，时不变的不可观测量与因变量有关，使用固定效应模型是适当的。</div></li><li><div><span style="--en-highlight: yellow; background-color: rgb(255, 239, 158); color: rgb(255, 0, 0);">注意，模型中使用了方差-协方差矩阵的稳健估计，</span><span style="--en-highlight: yellow; background-color: rgb(255, 239, 158); color: rgb(255, 0, 0); font-weight: bold;">Hausman 无法实现这一点</span></div></li><li><div><span style="font-weight: bold;">原理</span></div></li><ul><li><div><img data-filename="Image.png" src="Mundlak%20Model%2C%20Chamberlain%20Model%20%26%20Hybrid%20Mod_files/Image.png" type="image/png"/></div></li><li><div><img data-filename="Image.png" src="Mundlak%20Model%2C%20Chamberlain%20Model%20%26%20Hybrid%20Mod_files/Image%20%5B1%5D.png" type="image/png"/></div></li></ul></ul><div><br/></div></span>
</div>
</div>
