---
title: 固定效应回归模型-Paul Allison | Stata
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
  <li><div><span style="font-weight:700">固定效应回归模型</span></div></li>
  <li><div><span style="font-weight:700">Allison, P. D. (2009). Fixed effects regression models. SAGE publications.</span></div></li>
  <li><div><b style="background-color:#fffaa5;-evernote-highlight:true"><span style="background-color:#fffaa5;font-weight:700;color:red;-evernote-highlight:true">固定效应模型的基本原理</span></b></div></li>
  <li><div>基本思想：将每个个体作为其自身的控制。</div></li>
  <li><div>在个体固定效应模型中，只有within-individual的变化用来估计回归参数，个体的所有固定属性都得到控制</div></li>
  <li><div><span style="font-weight:700">固定效应模型的基本数据要求</span></div></li>
  <li><div><span style="font-weight:700">对于每个个体，因变量至少被测量两次</span>，测量结果具有直接可比性，即具有相同的意义和度量单位</div></li>
  <li><div>因此若存在测量问题，则会放大测量误差</div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><div><div><ul><li><div><span style="font-weight: bold;">固定效应回归模型</span></div></li><li><div><span style="font-weight: bold;">Allison, P. D. (2009). Fixed effects regression models. SAGE publications.</span></div></li><li><div><b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); font-weight: bold; color: rgb(255, 0, 0);-evernote-highlight:true;">固定效应模型的基本原理</span></b></div></li><ul><li><div>基本思想：将每个个体作为其自身的控制。</div></li><li><div>在个体固定效应模型中，只有within-individual的变化用来估计回归参数，个体的所有固定属性都得到控制</div></li></ul><li><div><span style="font-weight: bold;">固定效应模型的基本数据要求</span></div></li><ul><li><div><span style="font-weight: bold;">对于每个个体，因变量至少被测量两次</span>，测量结果具有直接可比性，即具有相同的意义和度量单位</div></li><ul><li><div>因此若存在测量问题，则会放大测量误差</div></li><li><div>Tam(1997)指出固定效应模型存在潜在错误（Potential Flaws）</div></li><ul><li><div>测量误差将产生有偏的参数估计和有偏的显著性检验。</div></li><li><div>测量误差是固定效应模型的脆弱性问题之一。</div></li><li><div>由于使用面板设计造成的方差损失将导致测量误差累积（ the loss of variance due to the use of a panel design will aggravate measurement-error bias ）。</div></li><li><div>在固定效应模型的背景下，关键自变量之间若存在多重共线性，可能使测量误差加剧和复杂化。问题的基本根源在于多重共线性意味着缺乏独立的方差（lack of independent variance）。即当两个解释性变量高度相关时，几乎没有独立的方差能够用来分离每个变量对因变量的影响（When two explanatory variables are highly correlated，there is little independent variance available to separate the effects of each on the dependent variable）。</div></li></ul><li><div>Griliches(1986)指出当两个或多个解释变量之间存在多重共线性时</div></li><ul><li><div>大大加重个体参数估计的测量误差大小（greatly aggravate size of measurement-error biases on individual parameter estimates）</div></li><li><div>在所有直接和非直接相关的变量中传递变差（transmit biases across all directly and indirectly correlated variables ）</div></li><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">一个变量的误差会对整个模型产生负面影响</span></div></li></ul></ul><li><div>样本中有<span style="font-weight: bold;">相当比例的案例的关键自变量在不同时点上的取值有所变化</span></div></li><ul><li><div>Sobel（1995）认为<span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">研究</span><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold; text-decoration: underline;-evernote-highlight:true;">非时变变量</span>的因果效应毫无意义。</div></li></ul></ul><li><div><span style="font-weight: bold;">固定效应模型与随机效应模型的比较</span></div></li><ul><li><div><span style="color: rgb(255, 0, 0); font-weight: bold;">固定效应模型的系数SE比随机效应模型大得多</span>，从而导致更大的P值和更宽的置信区间</div></li><ul><li><div>如果自变量的历时性变化很小，SE将非常大</div></li></ul><li><div><span style="color: rgb(255, 0, 0); font-weight: bold;">固定效应模型只使用了个体内信息</span><span style="color: rgb(255, 0, 0);">，</span><span style="color: rgb(255, 0, 0); font-weight: bold;">随机效应模型既使用个体内信息也使用个体间信息</span></div></li><li><div><span style="color: rgb(255, 0, 0); font-weight: bold;">若自变量取值在个体间存在较大差异，在个体内差异不大，固定效应估计将很不精确</span></div></li><ul><li><div>固定效应模型的思路：避免使用被污染的变异（个体间变异，可能与个体未被观测属性联系在一起），只使用能够对关键变量参数产生近似无偏估计的变异</div></li></ul></ul></ul><div><br/></div><ul><li><div><span style="font-weight: bold;">数据分析情形</span></div></li><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">两期数据情形：差分方法</span></span></div></li><li><div><span style="font-weight: bold;">基本假设</span></div></li><ul><li><div>X为时变变量，Z为非时变变量</div></li><li><div>每一期X的效应相同</div></li></ul><li><div><span style="font-weight: bold;">建模</span></div></li><ul><li><div>对每一期建模</div></li><ul><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image.gif" type="image/gif" width="349"/></div></li></ul><li><div>第二期减去第一期，建立一阶差分模型</div></li><ul><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B1%5D.gif" type="image/gif" width="391"/></div></li></ul><li><div>可改写为</div></li><ul><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B2%5D.gif" type="image/gif" width="349"/></div></li></ul><li><div>非时变变量和非时变误差已经排除出模型，当xi1和 xi2分别独立于 εi1和 εi2，则差分模型可得到 β 无偏估计。</div></li></ul><li><div><span style="font-weight: bold;">数据概况</span></div></li><ul><li><div>anti：反社会行为</div></li><li><div>prov：贫困</div></li><li><div>self：自信心</div></li><li><div>模型3结果初步判断：贫困变量不显著，说明贫困变量与反社会行为之间存在非时变机制，被差分模型控制了。</div></li><li><div><b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); font-weight: bold; color: rgb(255, 0, 0);-evernote-highlight:true;">这里有两种可能</span></b></div></li><ul><li><div>控制了非时变变量（中间机制），使贫困系数变小</div></li><li><div>由于时变自变量与因变量的随时间变化较小，使贫困系数的标准误很大</div></li><ul><li><div>事实上，贫穷的差异大多发生在女孩之间，在1990年至1994年期间，只有大约24% 的女孩进入或脱离贫穷。</div></li></ul></ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">一般经验</span></div></li><ul><li><div><span style="font-weight: bold;">一般的教训是: 每当固定效应方法的 p 值与其他方法的 p 值明显不同时，总是要检查</span><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">系数</span><span style="font-weight: bold;">和它们的</span><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">标准误差</span></span><span style="font-weight: bold;">。</span></div></li><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">模型3和模型1贫困系数的标准误接近，说明并非是时变变量的变异性不足，而是控制了非时变变量。</span></div></li></ul><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">截距项解释</span></span></div></li><ul><li><div><span style="font-weight: bold;">自变量未发生变化的情况下，因变量在不同时间点发生变化量的估计值</span></div></li></ul></ul></ul>

{{< stata >}}
cd "E:\OneDrive - whu.edu.cn\Data Storages\Dataset for Learning"
use nlsy.dta,clear
reg anti90 self90 pov90
est store m1
reg anti94 self94 pov94
est store m2
gen antidiff = anti94 - anti90
gen povdiff = pov94 - pov90
gen selfdiff = self94 - self90
reg antidiff povdiff selfdiff
est store m3
esttab m1 m2 m3,nogap se

------------------------------------------------------------
                      (1)             (2)             (3)   
                   anti90          anti94        antidiff   
------------------------------------------------------------
self90            -0.0501**                                 
                 (0.0187)                                   
pov90               0.595***                                
                  (0.126)                                   
self94                            -0.0639**                 
                                 (0.0211)                   
pov94                               0.547***                
                                  (0.148)                   
povdiff                                           -0.0363   
                                                  (0.128)   
selfdiff                                          -0.0561***
                                                 (0.0153)   
_cons               2.375***        2.888***        0.209***
                  (0.384)         (0.447)        (0.0631)   
------------------------------------------------------------
N                     581             581             581   
------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

</div><ul><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">对差分方法进行拓展</span></span></div></li><li><div><span style="font-weight: bold;">基本假设</span></div></li><ul><li><div><span style="font-weight: bold;">X为时变变量</span>，但<span style="font-weight: bold;">Z为非时变变量</span></div></li><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">X和Z对Y的影响在不同期存在差异</span></div></li></ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">拓展差分模型与基础差分模型的区别：</span><span style="font-weight: bold;">拓展差分模型预设时变变量与非时变变量</span><b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); font-weight: bold; color: rgb(255, 0, 0); text-decoration: underline;-evernote-highlight:true;">对Y的影响存在时变变化</span></b></div></li><li><div><span style="font-weight: bold;">基本建模</span></div></li><ul><li><div>对每一期建模</div></li><ul><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B3%5D.gif" type="image/gif" width="327"/></div></li></ul><li><div>第二期减去第一期：差分</div></li><ul><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B4%5D.gif" type="image/gif" width="357"/></div></li><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B5%5D.gif" type="image/gif" width="256"/></div></li></ul></ul><li><div><span style="font-weight: bold;">在Stata命令中</span></div></li><ul><li><div>补充第一期的时变变量，代表X1，包括pov90 self90</div></li><li><div>补充非时变变量，代表Z1，包括black hispanic childage married gender momage momwork</div></li></ul><li><div><span style="font-weight: bold;">根据差分模型，</span> <span style="color: rgb(255, 0, 0); font-weight: bold;">对于 z 和 x1，检验它们的系数是否为0等价于检验 β1 = β2还是 γ1 = γ2</span></div></li><li><div><span style="font-weight: bold;">根据模型结果，可能存在</span></div></li><ul><li><div><span style="color: rgb(255, 0, 0); font-weight: bold;">β1 = β2</span></div></li><li><div><span style="color: rgb(255, 0, 0); font-weight: bold;">除1990年当年的儿童年龄外（该非时变变量在不同时期发挥了不同作用），其余非时变变量则有γ1 = γ2</span></div></li></ul><li><div><span style="color: rgb(255, 0, 0); font-weight: bold;">大部分</span><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">非时变变量的系数不显著</span><span style="color: rgb(255, 0, 0); font-weight: bold;">，说明</span><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">它们对Y的影响在不同年份可能是一样的。</span></div></li></ul>

{{< stata >}}
reg antidiff povdiff selfdiff pov90 self90 black hispanic childage married gender momage momwork
est store m4
esttab m4,nogap se

----------------------------
                      (1)   
                 antidiff   
----------------------------
povdiff            0.0306   
                  (0.156)   
selfdiff          -0.0605**
                 (0.0199)   
pov90               0.121   
                  (0.178)   
self90            -0.0178   
                 (0.0253)   
black              -0.100   
                  (0.155)   
hispanic           0.0836   
                  (0.164)   
childage            0.220*  
                  (0.107)   
married            -0.206   
                  (0.154)   
gender              0.101   
                  (0.126)   
momage            -0.0399   
                 (0.0300)   
momwork            -0.153   
                  (0.140)   
_cons              -0.550   
                  (1.360)   
----------------------------
N                     581   
----------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><font color="#FF0000" style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">三期数据情形</span></font></div></li><li><div><span style="font-weight: bold;">基本建模</span></div></li><ul><li><div><span style="font-weight: bold;">构造两个差分模型</span></div></li><ul><li><div><img data-filename="Image.gif" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B6%5D.gif" type="image/gif" width="357"/></div></li></ul><li><div><span style="font-weight: bold;">两个差分模型可以同时估计，也可以构造数据结构让其一起估计。</span></div></li><ul><li><div>在新构造的数据结构中，<span style="font-weight: bold;">每个个体有两个模型，每个模型有一个id，非时变变量相同，模型变量为差分后的变量</span></div></li><li><div><span style="font-weight: bold;">但直接混合两个差分模型一起估计，系数标准误可能有偏差，需要使用广义最小二乘估计法（GLS），通过xtreg + i._j,pa</span></div></li></ul><li><div><span style="font-weight: bold;">第二种方法可以推广到多期差分方法（multiple-difference-score method）</span></div></li><ul><li><div><span style="font-weight: bold;"><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); font-weight: bold; color: rgb(255, 0, 0);-evernote-highlight:true;">GLS可以对误差项相关性</span></span>进行修正（</span><span style="color: rgb(255, 0, 0); font-weight: bold;">因为 ε2-ε1与 ε3-ε2均包含ε2，且方向相反，可能是负相关 </span><span style="font-weight: bold;">）</span></div></li></ul></ul></ul>

{{< stata >}}
gen antidif1=anti92-anti90 
gen antidif2=anti94-anti92 
gen selfdif1=self92-self90 
gen selfdif2=self94-self92 
gen povdif1=pov92-pov90 
gen povdif2=pov94-pov92 
reg antidif2 selfdif2 povdif2 
est store m5
reg antidif1 selfdif1 povdif1 
est store m6

gen id = _n
reshape long antidif povdif selfdif, i(id)
reg antidif povdif selfdif
est store m7
reg antidif povdif selfdif i._j
est store m8

*  Population-averaged (PA) model
xtset id _j
xtreg antidif povdif selfdif i._j, pa
est store m9
esttab m5 m6 m7 m8 m9,nogap se mtitle("1-2期差分法" "2-3期差分法" "多期差分法" "多期差分法" "GLS差分法")

--------------------------------------------------------------------------------------------
                      (1)             (2)             (3)             (4)             (5)   
                  1-2期差分法      2-3期差分法       多期差分法       多期差分法       GLS差分法   
--------------------------------------------------------------------------------------------
selfdif2          -0.0720***                                                                
                 (0.0157)                                                                   
povdif2             0.216                                                                   
                  (0.136)                                                                   
selfdif1                          -0.0391**                                                 
                                 (0.0136)                                                   
povdif1                             0.197                                                   
                                  (0.133)                                                   
povdif                                              0.213*          0.213*          0.139   
                                                 (0.0952)        (0.0952)        (0.0937)   
selfdif                                           -0.0552***      -0.0551***      -0.0551***
                                                 (0.0104)        (0.0104)        (0.0105)   
2._j                                                                0.122           0.122   
                                                                 (0.0797)        (0.0937)   
_cons               0.171**        0.0403           0.106**        0.0451          0.0446   
                 (0.0595)        (0.0534)        (0.0400)        (0.0565)        (0.0564)   
--------------------------------------------------------------------------------------------
N                     581             581            1162            1162            1162   
--------------------------------------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><span style="font-weight: bold;">固定效应方法</span></div></li><ul><li><div>在两期情况下<b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); font-weight: bold; color: rgb(255, 0, 0);-evernote-highlight:true;">，固定效应法与差分法结果一致</span></b>，<span style="font-weight: bold; text-decoration: underline;">三期及以上则不同，</span><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold; text-decoration: underline;-evernote-highlight:true;">自由度不相同</span></div></li><li><div>LSDV控制个体虚拟变量会耗费大量内存，可以采用时变变量（包括自变量和因变量）对中的方法直接进行回归<b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><font style="color: rgb(255, 0, 0);">，但对中方法的标准误和P值不正确</font></b></div></li></ul><li><div><span style="font-weight: bold;">比较模型结果可以发现</span></div></li><ul><li><div>固定效应模型的贫困系数的标准差大于混合回归变量，因为固定效应没有考虑个体间差异信息</div></li><li><div>最适合使用固定效应分析的情况：<span style="font-weight: bold;">时变自变量在同一个体的不同时期存在很大变化，但时变因变量来自个体间存在很大变化</span></div></li></ul><li><div><span style="font-weight: bold;">判断时变自变量的变异性是集中在个体内还是个体间，采用ANOVA方法</span></div></li><ul><li><div><span style="font-weight: bold;">可知对于self，有53%的变异来自个体间差异，适合使用固定效应模型</span></div></li><li><div><span style="font-weight: bold;">可知对于pro，有70%的变异来自个体间差异，使用固定效应模型要谨慎</span></div></li></ul><li><div><span style="font-weight: bold;">均值离差法（对中的方法）</span></div></li><ul><li><div><span style="font-weight: bold;"><img data-filename="Image.png" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image.png" type="image/png"/></span></div></li><li><div><img data-filename="Image.png" src="%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E5%9B%9E%E5%BD%92%E6%A8%A1%E5%9E%8B-Paul%20Allison%20%20Stata_files/Image%20%5B1%5D.png" type="image/png"/></div></li></ul><li><div><b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><font color="#FF0000">固定效应方法的检验</font></b></div></li><ul><li><div><b>F检验，检验所有固定效应虚拟变量系数都等于0这一虚无假设是否成立</b></div></li><ul><li><div>若p值&lt;0.001，则有证据表明存在个体层面的未被观测的异质性</div></li><li><div>即个体间在因变量上存在着稳定的差异，已观测解释变量不能完全解释这些差异</div></li></ul><li><div><b>因变量中被固定效应所解释的比例</b></div></li><ul><li><div>rho = .63737335 (fraction of variance due to u_i)</div></li></ul><li><div><b>固定效应与时变自变量的线性组合之间的相关系数</b></div></li><ul><li><div>在随机效应模型中，这一系数被假定等于0</div></li><li><div>corr(u_i, Xb)  = 0.0683</div></li></ul><li><div><b>三个确定系数R_square</b></div></li><ul><li><div><b><font color="#FF0000" style="background-color: rgb(255, 250, 165);-evernote-highlight:true;">从hybrid model来进行解释</font></b></div></li><li><div>个体内确定系数 within  = 0.0331，即时变自变量的离差变量的确定系数</div></li><li><div>个体间确定系数 between = 0.0418，即时变自变量均值的确定系数</div></li><li><div>总体确定系数 overall = 0.0359，即y值本身与y预测值之间的确定系数</div></li></ul></ul></ul>

{{< stata >}}
cd "E:\OneDrive - whu.edu.cn\Data Storages\Dataset for Learning"
use nlsy.dta,clear
gen id= _n
reshape long anti self pov, i(id) 
bys id:gen times = _n
set matsize 11000

reg anti self pov i.time
est store m10
reg anti self pov i.time i.id
est store m11
xtset id time
xi: xtreg anti self pov i.time, fe
est store m12
esttab m10 m11 m12,nogap se mtitle("混合回归" "LSDV" "双向固定效应")

------------------------------------------------------------
                      (1)             (2)             (3)   
                 混合回归            LSDV         双向固定效应   
------------------------------------------------------------
self              -0.0669***      -0.0552***      -0.0552***
                 (0.0111)        (0.0105)        (0.0105)   
pov                 0.518***        0.112           0.112   
                 (0.0786)        (0.0934)        (0.0934)   
2.times            0.0506          0.0444                   
                 (0.0904)        (0.0586)                   
3.times             0.223*          0.211***                
                 (0.0906)        (0.0588)                   
_Itimes_2                                          0.0444   
                                                 (0.0586)   
_Itimes_3                                           0.211***
                                                 (0.0588)   
_cons               2.737***        2.053**         2.637***
                  (0.234)         (0.630)         (0.217)   
------------------------------------------------------------
N                    1743            1743            1743   
------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001

qui:anova self id
dis e(r2)

.53314504

qui:anova pov id
dis e(r2)

.70361122
{{< /stata >}}

</div><ul><li><div><span style="font-weight: bold;">在固定效应模型中考虑时间交互项</span></div></li></ul>

{{< stata >}}
eststo interaction: xtreg anti i.times##c.self i.times##pov i.times##gender i.times##c.childage i.times##i.hispanic i.times##black i.times##momwork i.times##married i.times##c.momage, fe i(id)
esttab interaction, nogap se

-----------------------------------------
                      (1)                
                     anti                
-----------------------------------------
2.times             0.291         (1.245)
3.times            -0.444         (1.258)
self              -0.0343*       (0.0165)
2.times#c.~f      -0.0258        (0.0202)
3.times#c.~f      -0.0233        (0.0215)
1.pov              0.0969         (0.130)
2.times#1.~v       -0.112         (0.152)
3.times#1.~v       0.0992         (0.155)
2.times#1.~r       0.0407         (0.118)
3.times#1.~r        0.107         (0.118)
2.times#c.~e       0.0764         (0.100)
3.times#c.~e        0.227*        (0.101)
2.times#1.~c        0.190         (0.154)
3.times#1.~c       0.0754         (0.153)
2.times#1.~k        0.250         (0.144)
3.times#1.~k       -0.110         (0.144)
2.times#1.~k        0.137         (0.131)
3.times#1.~k       -0.144         (0.130)
2.times#1.~d      -0.0954         (0.143)
3.times#1.~d       -0.176         (0.143)
2.times#c.~e      -0.0269        (0.0282)
3.times#c.~e      -0.0425        (0.0281)
_cons               2.224***      (0.336)
-----------------------------------------
N                    1743                
-----------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div><span style="font-weight: bold;">固定效应与随机效应的比较</span></div></li><ul><li><div>随机效应模型不能真正控制未观测的异质性，因为常规随机效应模型<b><font style="color: rgb(255, 0, 0); background-color: rgb(255, 250, 165);-evernote-highlight:true;">预设观测变量与未观测变量之间不存在相关性</font></b></div></li><li><div>固定效应模型允许非时变自变量与时变自变量之间存在相关性，只不过在相关性确实为0时，损失了估计效率（系数标准误变大）</div></li><li><div>事实上，<span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><b><font style="color: rgb(255, 0, 0);">随机效应模型是固定效应模型的一个特例</font></b></span></div></li><li><div>可以采用Hausman检验：H0假设，随机效应系数与固定效应系数相同</div></li><ul><li><div>如果随机效应方法所带来的偏差小到足以忽视，可以选随机效应方法</div></li><li><div>当p &gt; 0.05，认为随机效应与固定效应系数可能相同，选随机效应和固定效应都行</div></li><li><div>当p &lt; 0.05，认为随机效应与固定效应系数不相同，随机效应不能控制未观测的变异性，选固定效应</div></li></ul></ul></ul>

{{< stata >}}
xi: xtreg anti self pov gender childage hispanic black momwork married momage i.time 
estimates store random_effects 
xi: xtreg anti self pov i.time, fe 
estimates store fixed_effects 
hausman fixed_effects random_effects

               ---- Coefficients ----
             |      (b)          (B)            (b-B)     sqrt(diag(V_b-V_B))
             |  fixed_effe~s random_eff~s    Difference          S.E.
-------------+----------------------------------------------------------------
        self |   -.0551514    -.0620586        .0069072        .0044943
         pov |    .1124749      .246818       -.1343431        .0475455
    _Itime_2 |    .0443934     .0473322       -.0029388               .
    _Itime_3 |    .2107366     .2163669       -.0056303               .
------------------------------------------------------------------------------
                           b = consistent under Ho and Ha; obtained from xtreg
            B = inconsistent under Ha, efficient under Ho; obtained from xtreg


    Test:  Ho:  difference in coefficients not systematic


                  chi2(4) = (b-B)'[(V_b-V_B)^(-1)](b-B)
                          =       10.01
                Prob>chi2 =      0.0403
                (V_b-V_B is not positive definite)
{{< /stata >}}

<ul><li><div><span style="font-weight: bold; background-color: rgb(255, 250, 165);-evernote-highlight:true;"><font color="#FF0000">混合方法</font></span></div></li><li><div><span style="font-weight: bold;">变量构成</span></div></li><ul><li><div>时变因变量：无须改变</div></li><li><div>时变自变量：<b><font style="color: rgb(255, 0, 0); background-color: rgb(255, 250, 165);-evernote-highlight:true;">1、构造个体均值离差变量</font></b><span style="color: rgb(255, 0, 0); font-weight: bold; background-color: rgb(255, 250, 165);-evernote-highlight:true;">；2、构造个体均值变量</span></div></li><li><div>非时变自变量：直接加入</div></li><li><div>时间变量：虚拟变量加入</div></li></ul><li><div><span style="font-weight: bold;">好处</span></div></li><ul><li><div>混合方法和固定效应方法对时变自变量的估计结果相同</div></li><li><div>混合方法可以估计非时变变量的结果</div></li><li><div>检验时变自变量的<span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold; text-decoration: underline;-evernote-highlight:true;">个体均值离差变量系数</span>与<u style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); text-decoration: underline; color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">个体均值变量系数</span></u>的相等是否成立/差异为0</div></li><ul><li><div>p &gt; 0.05，差异可能为0，随机效应和固定效应均可</div></li><li><div>p &lt; 0.05，差异不为0，选固定效应</div></li></ul></ul><li><div><span style="font-weight: bold;">混合方法（Hybrid method或BW方法）在线性模型中的估计一致性</span></div></li><ul><li><div><span style="font-weight: bold;">“poor man’s conditional likelihood” (Neuhaus and McCulloch 2006) or the “between-within (BW) method” (Sjölander et al. 2013)</span></div></li><li><div>Goetgeluk, S and S Vansteelandt (2008) “Conditional generalized estimating equations for the analysis of clustered and longitudinal data.” <span style="font-style: italic;">Biometrics</span> 64: 772-780.</div></li></ul><li><div><b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><font color="#FF0000">混合方法的本质</font></b></div></li><ul><li><div><b><font style="background-color: rgb(255, 250, 165);-evernote-highlight:true;">时变自变量在个体内对中后的<font style="color: rgb(255, 0, 0);">均值离差变量</font>，与<font style="color: rgb(255, 0, 0);">非时变变量</font>不相关</font></b></div></li><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><b><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;">按个体均值对中，本质上等同于控制所有非时变自变量</span></b></span></div></li></ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0);-evernote-highlight:true;"><b>对Hausman检验的替代检验</b></span></div></li><ul><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><b><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;">本质上，检验均值离差变量，与组均值变量之间的系数是否相等，即是检验随机效应模型与固定效应模型的差异</span></b></span></div></li><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><b><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;">这里使用的是Wald检验</span></b></span></div></li><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><b>检验均值离差自变量与组均值相等的，p &lt; 0.01，即<font style="color: rgb(255, 0, 0);">拒绝</font>随机效应模型与固定效应模型的估计量<font style="color: rgb(255, 0, 0);">相等</font></b></span></div></li></ul></ul>

{{< stata >}}
egen mself=mean(self), by(id) 
egen mpov=mean(pov), by(id) 
gen dself=self-mself 
gen dpov=pov-mpov
*原始固定效应方法
eststo fe: xtreg anti self pov i.time, fe


*混合方法
eststo hybrid: xtreg anti dself dpov mself mpov black hispanic childage married gender momage momwork i.time 
eststo hybrid2: xtreg anti dself dpov mself mpov i.time

esttab hybrid hybrid2,nogap se

--------------------------------------------
                      (1)             (2)   
                   hybrid         hybrid2   
--------------------------------------------
dself             -0.0552***      -0.0552***
                 (0.0105)        (0.0105)   
dpov                0.112           0.112   
                 (0.0934)        (0.0934)   
mself             -0.0900***      -0.0748***
                 (0.0220)        (0.0223)   
mpov                0.616***        0.684***
                  (0.157)         (0.138)   
black               0.111                   
                  (0.132)                   
hispanic           -0.280*                  
                  (0.139)                   
childage           0.0857                   
                 (0.0908)                   
married            -0.128                   
                  (0.129)                   
gender             -0.508***                
                  (0.107)                   
momage            -0.0113                   
                 (0.0254)                   
momwork             0.164                   
                  (0.119)                   
2.times            0.0444          0.0444   
                 (0.0586)        (0.0586)   
3.times             0.211***        0.211***
                 (0.0588)        (0.0588)   
_cons               2.908*          2.849***
                  (1.160)         (0.463)   
--------------------------------------------
N                    1743            1743   
--------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001

corr dself black

             |    dself    black
-------------+------------------
       dself |   1.0000
       black |  -0.0000   1.0000

estimate restore hybrid
test (dself=mself) (dpov=mpov)

( 1)  dself - mself = 0
( 2)  dpov - mpov = 0


           chi2(  2) =    9.87
         Prob > chi2 =    0.0072



*随机截距模型
eststo mix: xtmixed anti dself dpov mself mpov black hispanic childage married gender momage momwork i.time || id: ds

esttab fe hybrid hybrid2 mix,nogap se mtitle(fe hybrid hybrid2 mix)

----------------------------------------------------------------------------
                      (1)             (2)             (3)             (4)   
                       fe          hybrid         hybrid2             mix   
----------------------------------------------------------------------------
main                                                                        
self              -0.0552***                                                
                 (0.0105)                                                   
pov                 0.112                                                   
                 (0.0934)                                                   
2.times            0.0444          0.0444          0.0444          0.0403   
                 (0.0586)        (0.0586)        (0.0586)        (0.0584)   
3.times             0.211***        0.211***        0.211***        0.204***
                 (0.0588)        (0.0588)        (0.0588)        (0.0586)   
dself                             -0.0552***      -0.0552***      -0.0552***
                                 (0.0105)        (0.0105)        (0.0112)   
dpov                                0.112           0.112           0.112   
                                 (0.0934)        (0.0934)        (0.0933)   
mself                             -0.0900***      -0.0748***      -0.0900***
                                 (0.0220)        (0.0223)        (0.0218)   
mpov                                0.616***        0.684***        0.616***
                                  (0.157)         (0.138)         (0.155)   
black                               0.111                           0.111   
                                  (0.132)                         (0.131)   
hispanic                           -0.280*                         -0.280*  
                                  (0.139)                         (0.138)   
childage                           0.0857                          0.0857   
                                 (0.0908)                        (0.0900)   
married                            -0.128                          -0.128   
                                  (0.129)                         (0.127)   
gender                             -0.508***                       -0.508***
                                  (0.107)                         (0.106)   
momage                            -0.0113                         -0.0113   
                                 (0.0254)                        (0.0252)   
momwork                             0.164                           0.164   
                                  (0.119)                         (0.118)   
_cons               2.637***        2.908*          2.849***        2.912*  
                  (0.217)         (1.160)         (0.463)         (1.150)   
----------------------------------------------------------------------------
lns1_1_1                                                                    
_cons                                                              -2.673***
                                                                  (0.356)   
----------------------------------------------------------------------------
lns1_1_2                                                                    
_cons                                                               0.122**
                                                                 (0.0371)   
----------------------------------------------------------------------------
lnsig_e                                                                     
_cons                                                             -0.0236   
                                                                 (0.0241)   
----------------------------------------------------------------------------
N                    1743            1743            1743            1743   
----------------------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001


{{< /stata >}}

<div><br/></div></div><div><br/></div></span>
</div>
</div>
