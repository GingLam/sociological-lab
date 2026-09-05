---
title: 利用最大似然法估计固定效应交叉滞后面板模型
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
  <li><div><span style="font-weight:700">Allison, P. D., Williams, R., &amp; Moral-Benito, E. (2017). Maximum likelihood for cross-lagged panel models with fixed effects. </span><span style="font-style:italic;font-weight:700">Socius</span><span style="font-weight:700">, </span><span style="font-style:italic;font-weight:700">3</span><span style="font-weight:700">, 2378023117710578.</span></div></li>
  <li><div><a href="https://journals.sagepub.com/doi/10.1177/2378023117710578">https://journals.sagepub.com/doi/10.1177/2378023117710578</a></div></li>
  <li><div><span style="font-weight:700">常见Stata包</span></div></li>
  <li><div><span style="font-weight:700">xtabond</span>：Arellano-Bond linear dynamic panel-data estimation</div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div><span><ul><li><div><span style="font-weight: bold;">Allison, P. D., Williams, R., &amp; Moral-Benito, E. (2017). Maximum likelihood for cross-lagged panel models with fixed effects. </span><span style="font-style: italic; font-weight: bold;">Socius</span><span style="font-weight: bold;">, </span><span style="font-style: italic; font-weight: bold;">3</span><span style="font-weight: bold;">, 2378023117710578.</span></div></li><li><div><a href="https://journals.sagepub.com/doi/10.1177/2378023117710578">https://journals.sagepub.com/doi/10.1177/2378023117710578</a></div></li><li><div><span style="font-weight: bold;">常见Stata包</span></div></li><ul><li><div><span style="font-weight: bold;">xtabond</span>：Arellano-Bond linear dynamic panel-data estimation</div></li><li><div><span style="font-weight: bold;">xtabond2</span>："Difference" and "system" generalized method-of-moments (GMM) dynamic panel estimator </div></li><li><div><span style="font-weight: bold;">xtdpd</span>：Linear dynamic panel-data estimation</div></li><li><div><span style="font-weight: bold;">xtdpdsys</span>：Arellano-Bover/Blundell-Bond linear dynamic panel-data estimation</div></li><li><div><span style="font-weight: bold;">xtdpd</span>： Linear dynamic panel-data estimation</div></li><li><div><span style="font-weight: bold;">xtdpdqml</span>：Quasi-maximum likelihood linear dynamic panel-data estimation</div></li><li><div><span style="font-weight: bold;">xtdpdml</span>：Dynamic panel-data models using maximum likelihood</div></li><li><div><span style="font-weight: bold;">xtdpdbc</span>：Bias-corrected estimation of linear dynamic panel models</div></li><li><div><span style="font-weight: bold;">xtdpdgmm</span>：GMM estimation of linear dynamic panel models</div></li><li><div><span style="font-weight: bold;">xtlsdvc</span>：Bias corrected LSDV dynamic panel data estimator</div></li><li><div><span style="font-weight: bold;">fect</span>：A Practical Guide to Counterfactual Estimators for Causal Inference with Time-Series Cross-Sectional Data</div></li><li><div>结合使用最大似然法与结构方程模型，简称ML-SEM</div></li><li><div>在大部分条件下，ML-SEM比GMM更有效，且偏误更小</div></li></ul><li><div><b>R 包</b></div></li><ul><li><div>dpm：<a href="https://dpm.jacob-long.com/">https://dpm.jacob-long.com/</a></div></li></ul><li><div><span style="font-weight: bold;">面板数据</span><span style="font-weight: bold;">（追踪数据或TSCS数据）</span><span style="font-weight: bold;">对非实验数据做出因果推断具有两大优势</span></div></li><ul><li><div>能够控制不被观测到的，非时混淆因素</div></li><ul><li><div>使用固定效应模型</div></li></ul><li><div>考虑滞后期互为因果关系，确定因果关系的方向</div></li><ul><li><div>第t期x和y能够同时影响第t+1期的x和y</div></li><li><div>使用交叉滞后面板模型（cross-lagged panel model），源于Duncan的二期双变量模型（two-wave，two variable model）</div></li></ul></ul><li><div><span style="font-weight: bold;">同时解决未观测混淆因素与确定因果关系方向的问题</span></div></li><ul><li><div>结合固定效应模型和交叉滞后面板模型存在严重的估计问题</div></li><ul><li><div>由于因变量的滞后效应，计量经济学把这类模型称为动态面板模型（dynamic panel data）</div></li></ul><li><div>动态面板模型的估计难题</div></li><ul><li><div>误差项与预测变量相关</div></li><li><div>偶然参数问题（incidental parameters problem）</div></li><li><div>干预变量初始条件的非确定性（uncertainties about the treatment of initial conditions）</div></li></ul><li><div>估计动态面板模型的方法</div></li><ul><li><div>把滞后期变量作为工具变量，即滞后期工具变量（lagged instrumental variable），进行广义矩估计方法（generalized method of moment，简称GMM）</div></li><li><div>通常使用Arellano-Bond估计法（AB estimator）</div></li><ul><li><div>xtabond、xtabond2</div></li></ul></ul><li><div>虽然AB方法为系数提供了一致估计，并非完全有效</div></li><ul><li><div>存在相当大的小样本偏差</div></li><li><div>自回归参数（autoregressive）接近1时表现不佳</div></li><ul><li><div>即因变量在以后某个时点对自身的影响</div></li></ul></ul><li><div>Moral-Benito和白聚山的看法</div></li><ul><li><div>采用最大似然法（Maximum Likelihood Estimation）可以克服偶然参数问题和初始条件问题</div></li><li><div>以Moral-Benito（2013）为顶峰，有效解决动态面板模型的估计问题</div></li></ul></ul><li><div><span style="font-weight: bold;">Moral-Benito方法</span></div></li><ul><li><div><img data-filename="Image.png" src="%E5%88%A9%E7%94%A8%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E6%B3%95%E4%BC%B0%E8%AE%A1%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E4%BA%A4%E5%8F%89%E6%BB%9E%E5%90%8E%E9%9D%A2%E6%9D%BF%E6%A8%A1%E5%9E%8B_files/Image.png" type="image/png"/></div></li><li><div><img data-filename="Image.png" src="%E5%88%A9%E7%94%A8%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E6%B3%95%E4%BC%B0%E8%AE%A1%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E4%BA%A4%E5%8F%89%E6%BB%9E%E5%90%8E%E9%9D%A2%E6%9D%BF%E6%A8%A1%E5%9E%8B_files/Image%20%5B1%5D.png" type="image/png"/></div></li><li><div>条件2需要一致性和渐进正态性</div></li><li><div>Moral-Benito方法并未包括严格外生的时变变量，但可以修改加入</div></li></ul><li><div><span style="font-weight: bold;">Allison（2014）证明了动态面板模型是广义线性结构方程模型（general linear structural equation model）的特殊案例</span></div></li><li><div><span style="font-weight: bold;">Allison和Moral-Benito（2013）证明SEM方法相比于GMM方法和早前ML方法的优点</span></div></li><ul><li><div>不存在偶然参数问题</div></li><li><div>初始条件作为完全外生的变量，不必纳入模型</div></li><li><div>当自回归参数接近1时，不存在估计问题</div></li><li><div>基于完全信息的最大似然估计（full information maximum likelihood，FIML）可以解决预测变量的缺失值问题</div></li><li><div>允许误差项方差随时间变化</div></li><li><div>允许不可观测的、非时变因素的效应</div></li><ul><li><div>AB方法不行，将差分掉</div></li></ul><li><div>许多模型限制可以很容易放松或检验</div></li><li><div>可以使用许多拟合优度测量法来评估模型的过度识别问题</div></li><li><div>不必在许多工具变量中进行选择</div></li><li><div>可以将多个指标的潜变量纳入模型</div></li><li><div>可以将非时变变量纳入模型</div></li></ul><li><div><span style="font-weight: bold;">xtdpdml计算的优势</span></div></li><ul><li><div>简化SEM建模</div></li><li><div>所有的变量效应被认为在不同时期相等</div></li><li><div>LR统计量提供总体拟合优度检验</div></li><li><div>wald统计量检验模型中的任何变量效应是否显著区别于0</div></li></ul><li><div><span style="font-weight: bold;">Moral-Benito（2013）方法的局限</span></div></li><ul><li><div>可能存在收敛失败</div></li><li><div>计算慢于AB方法，特别是使用FIML处理非平衡形式的缺失数据时</div></li></ul><li><div><span style="font-weight: bold;">交叉滞后面板模型与动态面板模型的比较</span></div></li><ul><li><div>交叉滞后面板模型</div></li><ul><li><div><img data-filename="Image.png" src="%E5%88%A9%E7%94%A8%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E6%B3%95%E4%BC%B0%E8%AE%A1%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E4%BA%A4%E5%8F%89%E6%BB%9E%E5%90%8E%E9%9D%A2%E6%9D%BF%E6%A8%A1%E5%9E%8B_files/Image%20%5B2%5D.png" type="image/png"/></div></li><li><div><img data-filename="Image.png" src="%E5%88%A9%E7%94%A8%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E6%B3%95%E4%BC%B0%E8%AE%A1%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E4%BA%A4%E5%8F%89%E6%BB%9E%E5%90%8E%E9%9D%A2%E6%9D%BF%E6%A8%A1%E5%9E%8B_files/Image%20%5B3%5D.png" type="image/png"/></div></li><li><div>w和z被认为是严格外生的</div></li></ul><li><div>动态面板模型</div></li><ul><li><div>基本与交叉滞后面板模型相似</div></li><li><div>x通常是一个向量而非标量</div></li><li><div>x通常不会滞后</div></li><li><div>αj被视为一组固定常数而非一组随机变量</div></li><ul><li><div>等价于允许α与所有时变预测变量之间存在无限制的相关性</div></li></ul></ul><li><div>交叉滞后面板模型是动态面板模型的特例</div></li><ul><li><div>动态面板模型-&gt;交叉滞后面板模型</div></li><li><div>滞后x并将其从一个向量减少到一个标量</div></li><li><div>将固定效应转变为随机效应</div></li><li><div>将方程2的结构强加于x对滞后y的依赖关系中</div></li></ul></ul><li><div><span style="font-weight: bold;">Arellano-Bond的广义矩估计法存在的问题</span></div></li><ul><li><div>小样本偏误</div></li><li><div>低效率</div></li><li><div>选择工具变量的不确定性</div></li></ul><li><div><span style="font-weight: bold;">ML-SEM方法与AB方法的比较</span></div></li><ul><li><div>四期动态面板模型的路径图</div></li><li><div><img data-filename="Image.png" src="%E5%88%A9%E7%94%A8%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E6%B3%95%E4%BC%B0%E8%AE%A1%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E4%BA%A4%E5%8F%89%E6%BB%9E%E5%90%8E%E9%9D%A2%E6%9D%BF%E6%A8%A1%E5%9E%8B_files/Image%20%5B4%5D.png" type="image/png" width="275"/></div></li><li><div>ML-SEM提出更强有力的预设</div></li><ul><li><div>所有内生变量都是正态多元</div></li><li><div>cov(ε, <span style="font-style: italic;">z</span>) = 0</div></li></ul><li><div>ML-SEM也放松很多AB方法的预设</div></li><ul><li><div>允许时间变量本身不受限制的影响</div></li><li><div>允许每个时间点上有不同的误差方差</div></li><li><div>允许个体效应的潜在变量α在不同时间点有不同的系数</div></li><li><div>允许固定效应与时变预测变量有不受限制的相关性，不依赖差分和其他方法消除固定效应</div></li><li><div>允许误差项与时变预测变量的未来取值相关</div></li><li><div>许多参数在不同时期的固定条件，可以被放松</div></li></ul><li><div>MB方法总体在一致估计和有效估计方面优于AB方法，且还有几个其他优点</div></li><ul><li><div>非时变变量可以纳入模型中</div></li><li><div>完全信息最大似然法（FIML）可以很容易处理预测变量中的缺失值</div></li><li><div>误差方差和其他参数可以随时间变化</div></li><li><div>可以使用许多拟合优度测量方法来评估模型的过度识辨限制</div></li><li><div>没有必要在许多可能的工具变量中进行选择</div></li></ul></ul><li><div><span style="font-weight: bold;">案例Cornwell and Rupert (1988)</span></div></li><ul><li><div><img data-filename="Image.png" src="%E5%88%A9%E7%94%A8%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E6%B3%95%E4%BC%B0%E8%AE%A1%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E4%BA%A4%E5%8F%89%E6%BB%9E%E5%90%8E%E9%9D%A2%E6%9D%BF%E6%A8%A1%E5%9E%8B_files/Image%20%5B5%5D.png" type="image/png"/></div></li></ul></ul>

{{< stata >}}
use https://www3.nd.edu/~rwilliam/statafiles/wages, clear
xtset id t
eststo m1: xtdpdml wks L.lwage, pre(L.union) inv(ed) errorinv lavaan(Socius, r)
esttab m1, nogap se
----------------------------
                      (1)   
                      wks   
----------------------------
wks2                        
wks1                0.188***
                 (0.0196)   
lwage1              0.588   
                  (0.488)   
union1             -1.206*  
                  (0.522)   
ed                 -0.107   
                 (0.0564)   
Alpha               1.000***
               (5.07e-16)   
E2                  1.000***
               (6.69e-16)   
_cons               36.37***
                  (2.893)   
----------------------------
{{< /stata >}}

<ul><li><div>案例Bollen &amp; Brand（2010）</div></li><ul><li><div>Bollen, K. A., &amp; Brand, J. E. (2010). A general panel model with random and fixed effects: A structural equations approach. <span style="font-style: italic;">Social Forces</span>, <span style="font-style: italic;">89</span>(1), 1-34.</div></li></ul></ul>

{{< stata >}}
cd "/Users/ginglam/OneDrive - whu.edu.cn/07_Scholars/Jennie E. Brand/A General Panel Model with Random and Fixed Effects/"
use bollenbrand.dta,clear
xtset id year

qui: eststo m1: xtreg lnwg hchild i.year
qui: eststo m2: xtreg lnwg hchild marr div i.year
qui: eststo m3: xtreg lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break i.year
qui: eststo m4: xtreg lnwg hchild i.year, fe
qui: eststo m5: xtreg lnwg hchild marr div i.year, fe
qui: eststo m6: xtreg lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break i.year, fe
esttab m1 m2 m3 m4 m5 m6, nogap se keep(hchild)

------------------------------------------------------------------------------------------------------------
                      (1)             (2)             (3)             (4)             (5)             (6)   
                     lnwg            lnwg            lnwg            lnwg            lnwg            lnwg   
------------------------------------------------------------------------------------------------------------
hchild            -0.0876***      -0.0963***      -0.0343***      -0.0646***      -0.0691***      -0.0436***
                (0.00399)       (0.00409)       (0.00391)       (0.00560)       (0.00564)       (0.00563)   
------------------------------------------------------------------------------------------------------------
N                   20841           20841           20841           20841           20841           20841   
------------------------------------------------------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001


use bollenbrand.dta,clear
qui: eststo m7: xtdpdml lnwg hchild, ylag(0) re fiml tfix errorinv 
qui: eststo m8: xtdpdml lnwg hchild marr div, ylag(0) re fiml tfix errorinv
qui: eststo m9: xtdpdml lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break , ylag(0) re fiml tfix errorinv
qui: eststo m10: xtdpdml lnwg hchild, ylag(0) fiml tfix errorinv
qui: eststo m11: xtdpdml lnwg hchild marr div, ylag(0) fiml tfix errorinv
qui: eststo m12: xtdpdml lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break , ylag(0) fiml tfix errorinv
esttab m7 m8 m9 m10 m11 m12, nogap se keep(hchild1)

------------------------------------------------------------------------------------------------------------                      (1)             (2)             (3)             (4)             (5)             (6)                        lnwg            lnwg            lnwg            lnwg            lnwg            lnwg   ------------------------------------------------------------------------------------------------------------lnwg1                                                                                                       hchild1           -0.0877***      -0.0965***      -0.0342***      -0.0659***      -0.0705***      -0.0433***                (0.00399)       (0.00409)       (0.00390)       (0.00557)       (0.00559)       (0.00557)   ------------------------------------------------------------------------------------------------------------N                    5231            5231            5231            5231            5231            5231   ------------------------------------------------------------------------------------------------------------Standard errors in parentheses* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div>xtdpdml与xtabond的比较</div></li><ul><li><div>xtabond预设恒定截距（constant intercept）和恒定方差（constant variance）</div></li><ul><li><div>xtdpdml可以设定constinv与errorinv来确保与xtabond的可比性，但这些预设是没有必要的</div></li><li><div>xtabond删除了所有包含确实数据的样本，因而在缺失数据中得到难以置信的估计结果</div></li></ul><li><div>在数据远没有强烈平衡的情况下，xtabond运行得更好或xtdpdml可能无法执行</div></li><li><div>如果模型有许多缺失数据和非时变变量，xtdpdml是更好的选择</div></li><ul><li><div>xtdpdml显示的是每一期的样本量，而非全部样本量</div></li><li><div>xtdpdml可以缺省fiml，删除缺失值样本以得到与xtabond相似的估计环境</div></li></ul></ul></ul>

{{< stata >}}
eststo m14: xtabond lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break black hisp
eststo m15: xtdpdml lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break, constinv errorinv fiml tfix store(fiml) inv(black hisp)
eststo m16: xtdpdml lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break, constinv errorinv tfix store(fiml) inv(black hisp)
 esttab m14 m15 m16,nogap se keep(hchild hchild2)

------------------------------------------------------------
                      (1)             (2)             (3)   
                     lnwg            lnwg            lnwg   
------------------------------------------------------------
main                                                        
hchild           -0.00913                                   
                (0.00906)                                   
hchild2                           -0.0210***      -0.0145   
                                (0.00636)       (0.00998)   
------------------------------------------------------------
N                    8915            5285            1229   
------------------------------------------------------------
{{< /stata >}}

<ul><li><div>拟合优度的衡量（goodness-of-ﬁt measures）</div></li><ul><li><div>检查α系数（未测量的固定效应系数）在不同时间段是否相同</div></li><ul><li><div>检验4、8、12、16、20、21表明，α在不同时间段并不相同</div></li></ul><li><div>检验误差方差（error variances）在不同时间段是否相同（errorinv选项设定为相同，但该约束是可疑的）</div></li><ul><li><div>检验22、23、24表明，误差方差在不同时间段不同</div></li></ul><li><div>与AB估计法不同，以上两个问题都可以用ML-SEM估计法解决</div></li><ul><li><div>AIC和BIC结果也支持约束更少的模型</div></li></ul></ul></ul>

{{< stata >}}
eststo m17: xtdpdml lnwg hchild marr div, ylags(0) fiml tfix errorinv gof store(m17)
esttab m17, nogap se scalar(chi2_ms df_ms p_ms BIC AIC) keep(hchild1)

----------------------------
                      (1)   
                     lnwg   
----------------------------
lnwg1                       
hchild1           -0.0705***
                (0.00559)   
----------------------------
N                    5231   
chi2_ms            1940.9   
df_ms                 106   
p_ms                    0   
BIC               73683.2   
AIC               72252.6   
----------------------------

estat scoretests

  ( 1)  [lnwg1]hchild1 - [lnwg6]hchild6 = 0  ( 2)  [lnwg1]marr1 - [lnwg6]marr6 = 0  ( 3)  [lnwg1]div1 - [lnwg6]div6 = 0  ( 4)  [lnwg1]Alpha = 1  ( 5)  [lnwg2]hchild2 - [lnwg6]hchild6 = 0  ( 6)  [lnwg2]marr2 - [lnwg6]marr6 = 0  ( 7)  [lnwg2]div2 - [lnwg6]div6 = 0  ( 8)  [lnwg2]Alpha = 1  (12)  [lnwg3]Alpha = 1  (13)  [lnwg4]hchild4 - [lnwg6]hchild6 = 0  (15)  [lnwg4]div4 - [lnwg6]div6 = 0  (16)  [lnwg4]Alpha = 1  (17)  [lnwg5]hchild5 - [lnwg6]hchild6 = 0  (20)  [lnwg5]Alpha = 1  (21)  [lnwg6]Alpha = 1  (22)  [var(e.lnwg1)]_cons - [var(e.lnwg6)]_cons = 0  (23)  [var(e.lnwg2)]_cons - [var(e.lnwg6)]_cons = 0  (24)  [var(e.lnwg3)]_cons - [var(e.lnwg6)]_cons = 0---------------------------------------             |      chi2     df  P>chi2-------------+-------------------------        ( 1) |    54.652      1    0.00        ( 2) |    17.970      1    0.00        ( 3) |     4.194      1    0.04        ( 4) |   543.286      1    0.00        ( 5) |    15.011      1    0.00        ( 6) |     5.726      1    0.02        ( 7) |     8.885      1    0.00        ( 8) |    91.101      1    0.00        (12) |     5.594      1    0.02        (13) |     5.866      1    0.02        (15) |     4.213      1    0.04        (16) |    98.223      1    0.00        (17) |     4.062      1    0.04        (20) |   100.611      1    0.00        (21) |   134.406      1    0.00        (22) |    12.887      1    0.00        (23) |    20.007      1    0.00        (24) |    20.581      1    0.00———————————————————

*修正后的模型，许可α和误差方差随时间变化
eststo m18: xtdpdml lnwg hchild marr div, ylags(0) fiml tfix alphafree gof store(m18)
esttab m18, nogap se scalar(chi2_ms df_ms p_ms BIC AIC) keep(hchild1)

----------------------------
                      (1)   
                     lnwg   
----------------------------
lnwg1                       
hchild1           -0.0455***
                (0.00579)   
----------------------------
N                    5231   
chi2_ms             789.3   
df_ms                  96   
p_ms            1.90e-109   
BIC               72617.2   
AIC               71120.9   
----------------------------
Standard errors in parentheses

lrtest m17 m18, stats

Likelihood-ratio test
Assumption: m17 nested within m18

LR chi2(10) = 1151.68
Prob > chi2 =  0.0000

Akaike's information criterion and Bayesian information criterion

-----------------------------------------------------------------------------
       Model |          N   ll(null)  ll(model)      df        AIC        BIC
-------------+---------------------------------------------------------------
         m17 |      5,231          .  -35908.31     218   72252.61   73683.21
         m18 |      5,231          .  -35332.47     228   71120.93   72617.15
-----------------------------------------------------------------------------
Note: BIC uses N = number of observations. See [R] BIC note.

{{< /stata >}}

<ul><li><div>固定效应与随机效应的似然比检验（likelihood-ratio test）</div></li><ul><li><div>使用lrtest re fe, stats</div></li><li><div>Allison (2009)指出，豪斯曼检验经常出现问题，比如产生负值</div></li><li><div>似然比检验具有优越的统计特性</div></li></ul></ul>

{{< stata >}}
lrtest m9 m12, stats

Likelihood-ratio test
Assumption: m9 nested within m12

LR chi2(60) = 337.14
Prob > chi2 = 0.0000

Akaike's information criterion and Bayesian information criterion

-----------------------------------------------------------------------------
       Model |          N   ll(null)  ll(model)      df        AIC        BIC
-------------+---------------------------------------------------------------
          m9 |      5,231          .  -184555.8    1908   372927.6   385448.6
         m12 |      5,231          .  -184387.2    1968   372710.4   385625.2
-----------------------------------------------------------------------------
Note: BIC uses N = number of observations. See [R] BIC note.
{{< /stata >}}

<ul><li><div>使用稳健标准误</div></li><ul><li><div>vce (sbentler)不能与fiml一起使用</div></li><li><div>vce(robust)可以同fiml一起使用</div></li></ul></ul>

{{< stata >}}
xtdpdml lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break, constinv errorinv tfix vce(sbentler) inv(black hisp) gof
xtdpdml lnwg hchild marr div eduatt cursc snrpt snrft exppt expft break, constinv errorinv tfix inv(black hisp) vce(robust) gof
{{< /stata >}}

<ul><li><div>案例：</div></li><li><div>Wu, H. F. (2021). Social determination, health selection or indirect selection? Examining the causal directions between socioeconomic status and obesity in the Chinese adult population. <span style="font-style: italic;">Social Science &amp; Medicine</span>, <span style="font-style: italic;">269</span>, 113564.</div></li><ul><li><div><a href="http://www-sciencedirect-com-s.vpn.whu.edu.cn:8118/science/article/pii/S0277953620307838">http://www-sciencedirect-com-s.vpn.whu.edu.cn:8118/science/article/pii/S0277953620307838</a></div></li></ul><li><div>Zhou, M. (2017). Motherhood, employment, and the dynamics of women’s gender attitudes. <span style="font-style: italic;">Gender &amp; Society</span>, <span style="font-style: italic;">31</span>(6), 751-776.</div></li><ul><li><div><a href="https://ersp.lib.whu.edu.cn/s/com/cnpereading/sage/G.http/paragraph/article/?doi=10.1177/0891243217732320">https://ersp.lib.whu.edu.cn/s/com/cnpereading/sage/G.http/paragraph/article/?doi=10.1177/0891243217732320</a></div></li></ul></ul><div><br/></div></span>
</div>
</div>
