---
title: 个体斜率固定效应模型 | FEIS
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
  <li><div><span style="font-weight:700">个体斜率的线性固定效应模型（linear Fixed-effects model with individual-specific slopes，FEIS）</span></div></li>
  <li><div><span style="font-weight:700">Ludwig, V., &amp; Brüderl, J. (2018). Is there a male marital wage premium? New evidence from the United States.</span> <span style="font-style:italic;font-weight:700">American Sociological Review</span><span style="font-weight:700">,</span> <span style="font-style:italic;font-weight:700">83</span><span style="font-weight:700">(4), 744-770.</span></div></li>
  <li><div><a href="http://iras.lib.whu.edu.cn:8080/rwt/SAGE/http/PNRXP3JPMNYHA3LTMWRXI4LPM6YGG55N/paragraph/article/?doi=10.1177/0003122418784909">http://iras.lib.whu.edu.cn:8080/rwt/SAGE/http/PNRXP3JPMNYHA3LTMWRXI4LPM6YGG55N/paragraph/article/?doi=10.1177/0003122418784909</a></div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div><span><div><ul><li><div><span style="font-weight: bold;">个体斜率的线性固定效应模型（linear Fixed-effects model with individual-specific slopes，FEIS）</span></div></li><li><div><span style="font-weight: bold;">Ludwig, V., &amp; Brüderl, J. (2018). Is there a male marital wage premium? New evidence from the United States.</span> <span style="font-style: italic; font-weight: bold;">American Sociological Review</span><span style="font-weight: bold;">,</span> <span style="font-style: italic; font-weight: bold;">83</span><span style="font-weight: bold;">(4), 744-770.</span></div></li><ul><li><div><a href="http://iras.lib.whu.edu.cn:8080/rwt/SAGE/http/PNRXP3JPMNYHA3LTMWRXI4LPM6YGG55N/paragraph/article/?doi=10.1177/0003122418784909">http://iras.lib.whu.edu.cn:8080/rwt/SAGE/http/PNRXP3JPMNYHA3LTMWRXI4LPM6YGG55N/paragraph/article/?doi=10.1177/0003122418784909</a></div></li></ul><li><div><span style="font-weight: bold;">Rüttenauer, T., &amp; Ludwig, V. (2019). Fixed Effects Individual Slopes: Accounting and Testing for Heterogeneous Effects in Panel Data or Other Multilevel Models.</span> <span style="font-style: italic; font-weight: bold;">Sociological Methods &amp; Research</span><span style="font-weight: bold;">, 0049124120926211.</span></div></li><ul><li><div><a href="https://journals.sagepub.com/doi/10.1177/0049124120926211">https://journals.sagepub.com/doi/10.1177/0049124120926211</a></div></li></ul><li><div><span style="font-weight: bold;">固定效应模型是FEIS模型的一个特例</span></div></li><li><div><span style="font-weight: bold;">考虑基本固定效应模型：</span></div></li><ul><li><div><img data-filename="Image.png" src="%E4%B8%AA%E4%BD%93%E6%96%9C%E7%8E%87%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E6%A8%A1%E5%9E%8B%20%20FEIS_files/Image.png" type="image/png"/></div></li><li><div>传统个体固定效应模型对数据进行去均质化，通过使用结果变量的个体均值，可以消除非时变混淆因素</div></li><ul><li><div>当结果变量是严格外生，那么干预变量的影响效应是无偏</div></li><li><div><img data-filename="Image.png" src="%E4%B8%AA%E4%BD%93%E6%96%9C%E7%8E%87%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E6%A8%A1%E5%9E%8B%20%20FEIS_files/Image%20%5B1%5D.png" type="image/png"/></div></li></ul><li><div>个体固定效应模型可以控制个体所有非时变的异质性，但传统固定效应模型依赖于控制组与处理组的平行趋势假设</div></li></ul><li><div><span style="font-weight: bold;">FEIS模型通过对个体结果变量进行时变估计（time-varying estimate），来对数据进行去趋势</span></div></li><ul><li><div>FEIS要求严格外生假设更弱</div></li><ul><li><div><img data-filename="Image.png" src="%E4%B8%AA%E4%BD%93%E6%96%9C%E7%8E%87%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E6%A8%A1%E5%9E%8B%20%20FEIS_files/Image%20%5B2%5D.png" type="image/png"/></div></li></ul><li><div>因为FEIS模型是以个体结果变量的增长趋势作为调节</div></li></ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">考虑增长趋势的拓展固定效应模型（Morgan &amp; Winship，2007）即</span><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold; text-decoration: underline;-evernote-highlight:true;">extended FE model with group-specific slopes (FEGS)</span></span></div></li><ul><li><div><img data-filename="Image.png" src="%E4%B8%AA%E4%BD%93%E6%96%9C%E7%8E%87%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E6%A8%A1%E5%9E%8B%20%20FEIS_files/Image%20%5B3%5D.png" type="image/png"/></div></li><li><div>标准固定效应模型可以考虑干预组之间的结果增长差异，因此没必要使用FEIS控制单个增长曲线</div></li><ul><li><div>treat_i不再是m_it，表明<span style="background-color: rgb(255, 250, 165); font-weight: bold;-evernote-highlight:true;">最终是否接受干预</span>（<span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 38, 0); font-weight: bold;-evernote-highlight:true;">而非</span><span style="background-color: rgb(255, 250, 165); font-weight: bold;-evernote-highlight:true;">何时是否接受干预</span></span>），α_20是估计未接受干预群体的结果变量分布的陡峭程度参数，相互作用系数α_21反映了最终接受干预群体的结果变量增长率。</div></li></ul><li><div>拓展考虑组间斜率的固定效应模型，没有控制个体水平上不均匀的增长，而是直接考虑干预组与控制组之间的结果变量增长率之间的平均差异。</div></li></ul><li><div><span style="font-weight: bold;">FEGC模型介于固定效应模型与FEIS模型之间，如果满足：</span></div></li><ul><li><div><img data-filename="Image.png" src="%E4%B8%AA%E4%BD%93%E6%96%9C%E7%8E%87%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E6%A8%A1%E5%9E%8B%20%20FEIS_files/Image%20%5B4%5D.png" type="image/png"/>，那么FEGC提供了干预变量的无偏估计</div></li><li><div>FEGC模型比固定效应模型所要求的严格外生性条件限制小，但比FEIS模型的严格外生性条件限制大</div></li><li><div>在FEGC模型中，平行趋势假设被干预组和控制组的共同趋势假设所取代</div></li><ul><li><div>若干预与否本身具有高度选择性，那么FEGS估计的干预变量系数应比固定效应模型小</div></li></ul></ul><li><div><b>斜率异质性引起的固定效应模型偏误取决于4部分</b></div></li><ul><li><div><br/></div></li></ul><li><div><span style="font-weight: bold;">个体斜率固定效应模型存在的局限</span></div></li><ul><li><div>FEIS可能吸收了部分干预效应(absorbs part of the treatment effect)</div></li><ul><li><div>斜率变量应该只包括混淆变量，否则若包含中介变量或对撞变量，会导致过度控制或选择偏差</div></li></ul><li><div>FEIS需要长面板或每组观测值相对多的数据形式</div></li><ul><li><div>观测期数大于回归参数数目</div></li></ul></ul></ul>

{{< stata >}}
use http://www.stata-press.com/data/r16/nlswork.dta,clear
replace union = 0 if mi(union)
xtset idcode year
drop if mi(ln_wage, union, msp, tenure, year)
eststo FE: xtreg ln_wage union msp tenure year, cluster(idcode) fe
eststo RE: xtreg ln_wage union msp tenure year, cluster(idcode) re
eststo FEGS: xtreg ln_wage union msp tenure year c.year#i.union, cluster(idcode) fe
eststo FEIS: xtfeis ln_wage union msp tenure year, slope(union) sp transformed(t_) cluster(idcode)
eststo FEIS1: xtfeis ln_wage union msp tenure year, slope(union) cluster(idcode)
esttab FE RE FEGS FEIS FEIS1, nogap se long 

--------------------------------------------------------------------------------------------
                      (1)             (2)             (3)             (4)             (5)   
                  ln_wage         ln_wage         ln_wage                         ln_wage   
--------------------------------------------------------------------------------------------
union               0.124***        0.140***        0.321***       0.0679               0   
                (0.00909)       (0.00861)        (0.0954)         (0.101)             (.)   
msp               0.00268         0.00253         0.00246                         0.00244   
                (0.00700)       (0.00638)       (0.00700)                       (0.00699)   
tenure             0.0201***       0.0242***       0.0204***                       0.0202***
                (0.00119)       (0.00111)       (0.00121)                       (0.00120)   
year               0.0114***       0.0107***       0.0117***                       0.0110***
               (0.000737)      (0.000673)      (0.000744)                      (0.000747)   
0.union#c.~r                                            0                                   
                                                      (.)                                   
1.union#c.~r                                     -0.00249*                                  
                                                (0.00122)                                   
_cons               0.703***        0.735***        0.682***        0.711***                
                 (0.0550)        (0.0498)        (0.0556)         (0.140)                   
--------------------------------------------------------------------------------------------
N                   28086           28086           28086                           26521   
--------------------------------------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001

gen b = .
gen lo = .
gen hi = .
gen n = _n
local c = 1
foreach i in FE RE FEGS FEIS {
    est restore `i'
    replace b = _b[union] if _n == `c'
    replace lo=b-1.96*_se[union] if _n == `c'
    replace hi=b+1.96*_se[union] if _n == `c'
    local c = `c'+1
}


twoway bar b n in 1/4, yline(0) barwidth(.5) lwidth(thick) lcolor(black) fcolor(white) ///
       || rcap lo hi n in 1/4, lwidth(thick) lcolor(black)  ///
       ||, xlabel(1 "FE" 2 "RE" 3 "FEGS" 4 "FEIS") ///
        legend(off) xtitle("")  ytitle("union premium (%) and 95% CI") ///
        yline(0, lcolor(black))
{{< /stata >}}

<div><img data-filename="Graph.png" src="%E4%B8%AA%E4%BD%93%E6%96%9C%E7%8E%87%E5%9B%BA%E5%AE%9A%E6%95%88%E5%BA%94%E6%A8%A1%E5%9E%8B%20%20FEIS_files/Graph.png" type="image/png"/><br/></div><div><br/></div>

{{< stata >}}
global xmpldir "/Users/ginglam/OneDrive - whu.edu.cn/07_Scholars/Tobias Rüttenauer/04_Example1/01_Stata"
cd "${xmpldir}"

use mwp_US_analysis, clear
xtset id year
recode nchild 3/max=3, gen(dchild)
tab dchild, gen(dchild)
recode year 1979/1980=1 1981/1985=2 1986/1990=3 1991/1995=4 1996/2000=5 2001/2005=6 2006/2012=7, gen(yeargr)
tab yeargr, gen(yeargr)
keep if sample1==1

//FEIS estimation and comparison across models
qui xtfeis lnw marry dchild2-dchild4 enrol yeduc tenure ib1.yeargr, slope(c.exp c.exp#c.exp) cluster(id)
est store FEIS

//standard FE model
qui xtreg lnw marry dchild2-dchild4  enrol yeduc tenure c.exp##c.exp ib1.yeargr, fe vce(cluster id) 
qui est store FE

//reproduce FE model using xtfeis command
qui xtfeis lnw marry dchild2-dchild4  enrol yeduc tenure c.exp##c.exp ib1.yeargr, cluster(id) 
qui est store FE_xtfeis

//FEGS model (FE allowing for Group-specific Slopes)
qui xtreg lnw marry dchild2-dchild4  enrol yeduc tenure c.exp c.exp#c.exp ib1.yeargr ///
    1.evermarr#c.exp 1.evermarr#c.exp#c.exp , fe vce(cluster id)
qui est store FEGS

//Standard RE model
qui xtreg lnw marry dchild2-dchild4  enrol yeduc tenure c.exp##c.exp ib1.yeargr , re vce(cluster id) 
qui est store RE

//RIRS model
qui mixed lnw marry dchild2-dchild4  enrol yeduc tenure ib1.yeargr exp expq || id: exp expq , vce(cluster id) mle
qui est store RS

//RSGS model
qui mixed lnw marry dchild2-dchild4  enrol yeduc tenure ib1.yeargr exp expq evermarr 1.evermarr#c.exp 1.evermarr#c.expq || id: exp expq , vce(cluster id) 
qui est store RSGS
test evermarr
test 1.evermarr#c.exp 1.evermarr#c.expq 

esttab RE FE FEIS, nogap se stats(N N_g r2_w, fmt(0 0 3)) ///
       keep(marry dchild2 dchild3 dchild4 enrol yeduc tenure exp c.exp#c.exp 1.evermarr#c.exp ///
       1.evermarr#c.exp#c.exp expq 1.evermarr#c.expq) ///
       mtitle(RE FE FEIS)

------------------------------------------------------------
                      (1)             (2)             (3)   
                       RE              FE            FEIS   
------------------------------------------------------------
marry              0.0994***       0.0800***      0.00474   
                (0.00794)       (0.00832)       (0.00919)   
dchild2            0.0147          0.0198*        -0.0155   
                (0.00798)       (0.00841)       (0.00975)   
dchild3            0.0361***       0.0385***      -0.0276   
                 (0.0110)        (0.0117)        (0.0151)   
dchild4          -0.00263         0.00408         -0.0543*  
                 (0.0165)        (0.0177)        (0.0239)   
enrol              -0.192***       -0.199***       -0.123***
                (0.00865)       (0.00995)       (0.00964)   
yeduc              0.0735***       0.0678***      0.00708   
                (0.00229)       (0.00370)       (0.00597)   
tenure             0.0126***       0.0115***      0.00828***
                (0.00109)       (0.00111)       (0.00134)   
exp                0.0472***       0.0439***                
                (0.00232)       (0.00249)                   
c.exp#c.exp     -0.000623***    -0.000585***                
              (0.0000831)     (0.0000845)                   
------------------------------------------------------------
N                   49801           49801           49801   
N_g                  4287            4287            4287   
r2_w                0.336           0.336           0.019   
------------------------------------------------------------

esttab RS FEGS RSGS, nogap se stats(N N_g r2_w, fmt(0 0 3)) ///
       keep(marry dchild2 dchild3 dchild4 enrol yeduc tenure exp c.exp#c.exp 1.evermarr#c.exp ///
       1.evermarr#c.exp#c.exp expq 1.evermarr#c.expq) ///
       mtitle(RS FEGS RSGS)

------------------------------------------------------------
                      (1)             (2)             (3)   
                       RS            FEGS            RSGS   
------------------------------------------------------------
main                                                        
marry              0.0676***       0.0418***       0.0469***
                (0.00733)       (0.00833)       (0.00774)   
dchild2           0.00424          0.0141         0.00165   
                (0.00744)       (0.00841)       (0.00744)   
dchild3         -0.000305          0.0197        -0.00814   
                 (0.0103)        (0.0117)        (0.0104)   
dchild4           -0.0390*        -0.0214         -0.0515***
                 (0.0153)        (0.0176)        (0.0154)   
enrol              -0.169***       -0.198***       -0.171***
                (0.00806)       (0.00995)       (0.00807)   
yeduc              0.0555***       0.0663***       0.0541***
                (0.00224)       (0.00372)       (0.00223)   
tenure             0.0117***       0.0110***       0.0114***
                (0.00105)       (0.00111)       (0.00105)   
exp                0.0539***       0.0354***       0.0447***
                (0.00224)       (0.00307)       (0.00290)   
expq            -0.000860***                    -0.000802***
              (0.0000813)                      (0.000102)   
c.exp#c.exp                     -0.000447***                
                               (0.000105)                   
1.evermarr~p                       0.0158***       0.0144***
                                (0.00303)       (0.00304)   
1.evermarr~p                    -0.000277*                  
                               (0.000108)                   
1.evermarr~q                                    -0.000164   
                                               (0.000114)   
------------------------------------------------------------
N                   49801           49801           49801   
N_g                                  4287                   
r2_w                                0.338                   
------------------------------------------------------------
{{< /stata >}}

<div><br/></div><ul><li><div><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">是否使用FEIS的检验</span></div></li><li><div>Rüttenauer, T., &amp; Ludwig, V. (2019). Fixed Effects Individual Slopes: Accounting and Testing for Heterogeneous Effects in Panel Data or Other Multilevel Models. <span style="font-style: italic;">Sociological Methods &amp; Research</span>, 0049124120926211.</div></li><li><div><span style="font-weight: bold;">Bootstrapped Hausman test</span></div></li></ul>

{{< stata >}}
xtbsht FEIS1 FE, reps(100) seed(12121)

Test of H0: estimates of FEIS1 and FE consistent
Alternative H1: FEIS1 consistent, FE inconsistent

Test statistic: chi2(3) =           6.57
Prob > chi2 =                     0.0870

xtbsht FEIS1 RE, reps(100) seed(12121)

Test of H0: estimates of FEIS1 and RE consistent
Alternative H1: FEIS1 consistent, RE inconsistent

Test statistic: chi2(3) =         115.19
Prob > chi2 =                     0.0000
{{< /stata >}}

<div><br/></div><ul><li><div><span style="font-weight: bold;">Artificial Regression Test</span></div></li><ul><li><div><span style="font-weight: bold;">χ2检验值为14.29，表明FE估计值因异质性斜率而属于不一致估计</span></div></li><li><div><span style="font-weight: bold;">（are</span> <span style="font-weight: bold;">inconsistent because of heterogeneous slopes</span><span style="font-weight: bold;">）</span></div></li><li><div>因此应使用FEIS而非固定效应模型</div></li><li><div>若忽略异质性斜率，使用传统固定效应模型，从而认为参加工会有利于提高工资时，得到的估计效应将是个体斜率固定效应模型的2倍</div></li></ul></ul>

{{< stata >}}
eststo FEIS1:xtfeis ln_wage union msp tenure year, slope(ttl_exp) cluster(idcode)
xtart FEIS1

Test of H0: FEIS and FE estimates consistent
Alternative H1: FEIS consistent, FE inconsistent
Model constraints
( 1)  _pred_msp = 0
( 2)  _pred_tenure = 0
( 3)  _pred_year = 0

           chi2(  4) =   23.37
         Prob > chi2 =    0.0001

xtart FEIS1, re

Test of H0: FEIS and RE estimates consistent
Alternative H1: FEIS consistent, RE inconsistent
Model constraints
( 1)  _pred_msp = 0
( 2)  _pred_tenure = 0
( 3)  _pred_year = 0

           chi2(  4) =   37.48
         Prob > chi2 =    0.0000
{{< /stata >}}

<div><br/></div></div><div><br/></div></span>
</div>
</div>
