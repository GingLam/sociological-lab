---
title: 随机效应与混合效应 | Stata
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
  <li><div><span style="font-weight:700">方差成分模型</span></div></li>
  <li><div><span style="font-weight:700"><img data-filename="Image.png" src="%E9%9A%8F%E6%9C%BA%E6%95%88%E5%BA%94%E4%B8%8E%E6%B7%B7%E5%90%88%E6%95%88%E5%BA%94%20%20Stata_files/Image.png" type="image/png"/></span></div></li>
  <li><div><span style="font-weight:700"><img data-filename="Image.png" src="%E9%9A%8F%E6%9C%BA%E6%95%88%E5%BA%94%E4%B8%8E%E6%B7%B7%E5%90%88%E6%95%88%E5%BA%94%20%20Stata_files/Image%20%5B1%5D.png" type="image/png"/></span></div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">  1
  </span><span class="lnt">  2
  </span><span class="lnt">  3
  </span><span class="lnt">  4
  </span><span class="lnt">  5
  </span><span class="lnt">  6
  </span><span class="lnt">  7
  </span><span class="lnt">  8
  </span><span class="lnt">  9
  </span><span class="lnt"> 10
  </span><span class="lnt"> 11
  </span><span class="lnt"> 12
  </span><span class="lnt"> 13
  </span><span class="lnt"> 14
  </span><span class="lnt"> 15
  </span><span class="lnt"> 16
  </span><span class="lnt"> 17
  </span><span class="lnt"> 18
  </span><span class="lnt"> 19
  </span><span class="lnt"> 20
  </span><span class="lnt"> 21
  </span><span class="lnt"> 22
  </span><span class="lnt"> 23
  </span><span class="lnt"> 24
  </span><span class="lnt"> 25
  </span><span class="lnt"> 26
  </span><span class="lnt"> 27
  </span><span class="lnt"> 28
  </span><span class="lnt"> 29
  </span><span class="lnt"> 30
  </span><span class="lnt"> 31
  </span><span class="lnt"> 32
  </span><span class="lnt"> 33
  </span><span class="lnt"> 34
  </span><span class="lnt"> 35
  </span><span class="lnt"> 36
  </span><span class="lnt"> 37
  </span><span class="lnt"> 38
  </span><span class="lnt"> 39
  </span><span class="lnt"> 40
  </span><span class="lnt"> 41
  </span><span class="lnt"> 42
  </span><span class="lnt"> 43
  </span><span class="lnt"> 44
  </span><span class="lnt"> 45
  </span><span class="lnt"> 46
  </span><span class="lnt"> 47
  </span><span class="lnt"> 48
  </span><span class="lnt"> 49
  </span><span class="lnt"> 50
  </span><span class="lnt"> 51
  </span><span class="lnt"> 52
  </span><span class="lnt"> 53
  </span><span class="lnt"> 54
  </span><span class="lnt"> 55
  </span><span class="lnt"> 56
  </span><span class="lnt"> 57
  </span><span class="lnt"> 58
  </span><span class="lnt"> 59
  </span><span class="lnt"> 60
  </span><span class="lnt"> 61
  </span><span class="lnt"> 62
  </span><span class="lnt"> 63
  </span><span class="lnt"> 64
  </span><span class="lnt"> 65
  </span><span class="lnt"> 66
  </span><span class="lnt"> 67
  </span><span class="lnt"> 68
  </span><span class="lnt"> 69
  </span><span class="lnt"> 70
  </span><span class="lnt"> 71
  </span><span class="lnt"> 72
  </span><span class="lnt"> 73
  </span><span class="lnt"> 74
  </span><span class="lnt"> 75
  </span><span class="lnt"> 76
  </span><span class="lnt"> 77
  </span><span class="lnt"> 78
  </span><span class="lnt"> 79
  </span><span class="lnt"> 80
  </span><span class="lnt"> 81
  </span><span class="lnt"> 82
  </span><span class="lnt"> 83
  </span><span class="lnt"> 84
  </span><span class="lnt"> 85
  </span><span class="lnt"> 86
  </span><span class="lnt"> 87
  </span><span class="lnt"> 88
  </span><span class="lnt"> 89
  </span><span class="lnt"> 90
  </span><span class="lnt"> 91
  </span><span class="lnt"> 92
  </span><span class="lnt"> 93
  </span><span class="lnt"> 94
  </span><span class="lnt"> 95
  </span><span class="lnt"> 96
  </span><span class="lnt"> 97
  </span><span class="lnt"> 98
  </span><span class="lnt"> 99
  </span><span class="lnt">100
  </span><span class="lnt">101
  </span><span class="lnt">102
  </span><span class="lnt">103
  </span><span class="lnt">104
  </span><span class="lnt">105
  </span><span class="lnt">106
  </span><span class="lnt">107
  </span><span class="lnt">108
  </span><span class="lnt">109
  </span><span class="lnt">110
  </span><span class="lnt">111
  </span><span class="lnt">112
  </span><span class="lnt">113
  </span><span class="lnt">114
  </span><span class="lnt">115
  </span><span class="lnt">116
  </span><span class="lnt">117
  </span><span class="lnt">118
  </span><span class="lnt">119
  </span><span class="lnt">120
  </span><span class="lnt">121
  </span><span class="lnt">122
  </span><span class="lnt">123
  </span><span class="lnt">124
  </span><span class="lnt">125
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">cd "D:\Data Storages\Dataset for Learning"
  </span></span><span class="line"><span class="cl">use nlsy.dta,clear
  </span></span><span class="line"><span class="cl">gen id= _n
  </span></span><span class="line"><span class="cl">reshape long anti self pov, i(id)
  </span></span><span class="line"><span class="cl">bys id:gen times = _n
  </span></span><span class="line"><span class="cl">set matsize 11000
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">xtset id
  </span></span><span class="line"><span class="cl">xtreg anti,mle
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">        anti |      Coef.   Std. Err.      z    P&gt;|z|     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-------------+----------------------------------------------------------------
  </span></span><span class="line"><span class="cl">       _cons |   1.636833   .0557054    29.38   0.000     1.527652    1.746014
  </span></span><span class="line"><span class="cl">-------------+----------------------------------------------------------------
  </span></span><span class="line"><span class="cl">    /sigma_u |   1.208859   .0441422                      1.125365    1.298547
  </span></span><span class="line"><span class="cl">    /sigma_e |    1.01226   .0209977                      .9719306    1.054263
  </span></span><span class="line"><span class="cl">         rho |   .5878254   .0214793                      .5453008    .6293423
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">LR test of sigma_u=0: chibar2(01) = 578.26             Prob &gt;= chibar2 = 0.000
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">dis e(sigma_u)^2
  </span></span><span class="line"><span class="cl">1.4613398
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">dis e(sigma_e)^2
  </span></span><span class="line"><span class="cl">1.0246701
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">mixed anti || id:, mle
  </span></span><span class="line"><span class="cl">eststo m1
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">        anti |      Coef.   Std. Err.      z    P&gt;|z|     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-------------+----------------------------------------------------------------
  </span></span><span class="line"><span class="cl">       _cons |   1.636833   .0557054    29.38   0.000     1.527652    1.746014
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">  Random-effects Parameters  |   Estimate   Std. Err.     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-----------------------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">id: Identity                 |
  </span></span><span class="line"><span class="cl">                  var(_cons) |   1.461341   .1067235      1.266447    1.686226
  </span></span><span class="line"><span class="cl">-----------------------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">               var(Residual) |    1.02467   .0425105      .9446484     1.11147
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">LR test vs. linear model: chibar2(01) = 578.26        Prob &gt;= chibar2 = 0.0000
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">ICC(intraclass correlation coefficient)= var(_cons)/[var(_cons)+var(Residual)] = 1.461341 / (1.461341+1.02467) = .58782564
  </span></span><span class="line"><span class="cl">组内相关系数为58.78%，表明有58.78%的变异是由研究对象差异（组间斜率差异）造成
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">estat icc
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">Intraclass correlation
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">                       Level |        ICC   Std. Err.     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-----------------------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">                          id |   .5878256   .0214794      .5451833    .6291892
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">mean anti
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">Mean estimation                   Number of obs   =      1,743
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">--------------------------------------------------------------
  </span></span><span class="line"><span class="cl">             |       Mean   Std. Err.     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">        anti |   1.636833    .037777       1.56274    1.710926
  </span></span><span class="line"><span class="cl">--------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">reg anti
  </span></span><span class="line"><span class="cl">eststo m2
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">      Source |       SS           df       MS      Number of obs   =     1,743
  </span></span><span class="line"><span class="cl">-------------+----------------------------------   F(0, 1742)      =      0.00
  </span></span><span class="line"><span class="cl">       Model |           0         0           .   Prob &gt; F        =         .
  </span></span><span class="line"><span class="cl">    Residual |  4333.11532     1,742  2.48743704   R-squared       =    0.0000
  </span></span><span class="line"><span class="cl">-------------+----------------------------------   Adj R-squared   =    0.0000
  </span></span><span class="line"><span class="cl">       Total |  4333.11532     1,742  2.48743704   Root MSE        =    1.5772
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">        anti |      Coef.   Std. Err.      t    P&gt;|t|     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-------------+----------------------------------------------------------------
  </span></span><span class="line"><span class="cl">       _cons |   1.636833    .037777    43.33   0.000      1.56274    1.710926
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">mixed anti
  </span></span><span class="line"><span class="cl">eststo m3
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">Mixed-effects ML regression                     Number of obs     =      1,743
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">                                                Wald chi2(0)      =          .
  </span></span><span class="line"><span class="cl">Log likelihood = -3266.8666                     Prob &gt; chi2       =          .
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">        anti |      Coef.   Std. Err.      z    P&gt;|z|     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-------------+----------------------------------------------------------------
  </span></span><span class="line"><span class="cl">       _cons |   1.636833   .0377662    43.34   0.000     1.562813    1.710853
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">  Random-effects Parameters  |   Estimate   Std. Err.     [95% Conf. Interval]
  </span></span><span class="line"><span class="cl">-----------------------------+------------------------------------------------
  </span></span><span class="line"><span class="cl">               var(Residual) |    2.48601   .0842111      2.326319    2.656663
  </span></span><span class="line"><span class="cl">------------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">lrtest m1 m3, stats
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">Likelihood-ratio test                                 LR chi2(1)  =    578.26
  </span></span><span class="line"><span class="cl">(Assumption: m3 nested in m1)                         Prob &gt; chi2 =    0.0000
  </span></span><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">-----------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">       Model |          N   ll(null)  ll(model)      df        AIC        BIC
  </span></span><span class="line"><span class="cl">-------------+---------------------------------------------------------------
  </span></span><span class="line"><span class="cl">          m3 |      1,743          .  -3266.867       2   6537.733    6548.66
  </span></span><span class="line"><span class="cl">          m1 |      1,743          .  -2977.735       3    5961.47   5977.861
  </span></span><span class="line"><span class="cl">-----------------------------------------------------------------------------
  </span></span><span class="line"><span class="cl">Note: BIC uses N = number of observations. See [R] BIC note.
  </span></span><span class="line"><span class="cl">
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><ul><li><div><span style="font-weight: bold;">方差成分模型</span></div></li><ul><li><div><span style="font-weight: bold;"><img data-filename="Image.png" src="%E9%9A%8F%E6%9C%BA%E6%95%88%E5%BA%94%E4%B8%8E%E6%B7%B7%E5%90%88%E6%95%88%E5%BA%94%20%20Stata_files/Image.png" type="image/png"/></span></div></li><li><div><span style="font-weight: bold;"><img data-filename="Image.png" src="%E9%9A%8F%E6%9C%BA%E6%95%88%E5%BA%94%E4%B8%8E%E6%B7%B7%E5%90%88%E6%95%88%E5%BA%94%20%20Stata_files/Image%20%5B1%5D.png" type="image/png"/></span></div></li></ul></ul>

{{< stata >}}
cd "D:\Data Storages\Dataset for Learning"
use nlsy.dta,clear
gen id= _n
reshape long anti self pov, i(id)
bys id:gen times = _n
set matsize 11000

xtset id
xtreg anti,mle

------------------------------------------------------------------------------
        anti |      Coef.   Std. Err.      z    P>|z|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
       _cons |   1.636833   .0557054    29.38   0.000     1.527652    1.746014
-------------+----------------------------------------------------------------
    /sigma_u |   1.208859   .0441422                      1.125365    1.298547
    /sigma_e |    1.01226   .0209977                      .9719306    1.054263
         rho |   .5878254   .0214793                      .5453008    .6293423
------------------------------------------------------------------------------
LR test of sigma_u=0: chibar2(01) = 578.26             Prob >= chibar2 = 0.000

dis e(sigma_u)^2
1.4613398

dis e(sigma_e)^2
1.0246701

mixed anti || id:, mle
eststo m1

------------------------------------------------------------------------------
        anti |      Coef.   Std. Err.      z    P>|z|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
       _cons |   1.636833   .0557054    29.38   0.000     1.527652    1.746014
------------------------------------------------------------------------------


------------------------------------------------------------------------------
  Random-effects Parameters  |   Estimate   Std. Err.     [95% Conf. Interval]
-----------------------------+------------------------------------------------
id: Identity                 |
                  var(_cons) |   1.461341   .1067235      1.266447    1.686226
-----------------------------+------------------------------------------------
               var(Residual) |    1.02467   .0425105      .9446484     1.11147
------------------------------------------------------------------------------
LR test vs. linear model: chibar2(01) = 578.26        Prob >= chibar2 = 0.0000

ICC(intraclass correlation coefficient)= var(_cons)/[var(_cons)+var(Residual)] = 1.461341 / (1.461341+1.02467) = .58782564
组内相关系数为58.78%，表明有58.78%的变异是由研究对象差异（组间斜率差异）造成

estat icc

Intraclass correlation

------------------------------------------------------------------------------
                       Level |        ICC   Std. Err.     [95% Conf. Interval]
-----------------------------+------------------------------------------------
                          id |   .5878256   .0214794      .5451833    .6291892
------------------------------------------------------------------------------


mean anti

Mean estimation                   Number of obs   =      1,743

--------------------------------------------------------------
             |       Mean   Std. Err.     [95% Conf. Interval]
-------------+------------------------------------------------
        anti |   1.636833    .037777       1.56274    1.710926
--------------------------------------------------------------

reg anti
eststo m2

      Source |       SS           df       MS      Number of obs   =     1,743
-------------+----------------------------------   F(0, 1742)      =      0.00
       Model |           0         0           .   Prob > F        =         .
    Residual |  4333.11532     1,742  2.48743704   R-squared       =    0.0000
-------------+----------------------------------   Adj R-squared   =    0.0000
       Total |  4333.11532     1,742  2.48743704   Root MSE        =    1.5772


------------------------------------------------------------------------------
        anti |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
       _cons |   1.636833    .037777    43.33   0.000      1.56274    1.710926
------------------------------------------------------------------------------

mixed anti
eststo m3

Mixed-effects ML regression                     Number of obs     =      1,743


                                                Wald chi2(0)      =          .
Log likelihood = -3266.8666                     Prob > chi2       =          .


------------------------------------------------------------------------------
        anti |      Coef.   Std. Err.      z    P>|z|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
       _cons |   1.636833   .0377662    43.34   0.000     1.562813    1.710853
------------------------------------------------------------------------------


------------------------------------------------------------------------------
  Random-effects Parameters  |   Estimate   Std. Err.     [95% Conf. Interval]
-----------------------------+------------------------------------------------
               var(Residual) |    2.48601   .0842111      2.326319    2.656663
------------------------------------------------------------------------------

lrtest m1 m3, stats

Likelihood-ratio test                                 LR chi2(1)  =    578.26
(Assumption: m3 nested in m1)                         Prob > chi2 =    0.0000

-----------------------------------------------------------------------------
       Model |          N   ll(null)  ll(model)      df        AIC        BIC
-------------+---------------------------------------------------------------
          m3 |      1,743          .  -3266.867       2   6537.733    6548.66
          m1 |      1,743          .  -2977.735       3    5961.47   5977.861
-----------------------------------------------------------------------------
Note: BIC uses N = number of observations. See [R] BIC note.

{{< /stata >}}

<div><br/></div>

{{< stata >}}
xtset id time
xtreg anti self pov i.time, re mle
eststo m1
mixed anti self pov i.time || id :
eststo m2
esttab m1 m2,nogap se

--------------------------------------------
                      (1)             (2)   
                     anti            anti   
--------------------------------------------
anti                                        
self              -0.0597***      -0.0597***
                (0.00952)       (0.00952)   
pov                 0.295***        0.295***
                 (0.0779)        (0.0773)   
1.times                 0               0   
                      (.)             (.)   
2.times            0.0470          0.0470   
                 (0.0586)        (0.0586)   
3.times             0.216***        0.216***
                 (0.0587)        (0.0587)   
_cons               2.667***        2.667***
                  (0.203)         (0.203)   
--------------------------------------------
sigma_u                                     
_cons               1.176***                
                 (0.0434)                   
--------------------------------------------
sigma_e                                     
_cons               0.997***                
                 (0.0207)                   
--------------------------------------------
lns1_1_1                                    
_cons                               0.163***
                                 (0.0369)   
--------------------------------------------
lnsig_e                                     
_cons                            -0.00294   
                                 (0.0208)   
--------------------------------------------
N                    1743            1743   
--------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<ul><li><div>若认为随机效应中ui0 与 ui1 相关</div></li></ul>

{{< stata >}}
mixed anti self pov i.time || id :, cov(uns)
eststo m3
esttab m1 m2 m3,nogap se

------------------------------------------------------------
                      (1)             (2)             (3)   
                     anti            anti            anti   
------------------------------------------------------------
anti                                                        
self              -0.0597***      -0.0597***      -0.0597***
                (0.00952)       (0.00952)       (0.00952)   
pov                 0.295***        0.295***        0.295***
                 (0.0779)        (0.0773)        (0.0773)   
1.times                 0               0               0   
                      (.)             (.)             (.)   
2.times            0.0470          0.0470          0.0470   
                 (0.0586)        (0.0586)        (0.0586)   
3.times             0.216***        0.216***        0.216***
                 (0.0587)        (0.0587)        (0.0587)   
_cons               2.667***        2.667***        2.667***
                  (0.203)         (0.203)         (0.203)   
------------------------------------------------------------
sigma_u                                                     
_cons               1.176***                                
                 (0.0434)                                   
------------------------------------------------------------
sigma_e                                                     
_cons               0.997***                                
                 (0.0207)                                   
------------------------------------------------------------
lns1_1_1                                                    
_cons                               0.163***        0.163***
                                 (0.0369)        (0.0369)   
------------------------------------------------------------
lnsig_e                                                     
_cons                            -0.00294        -0.00294   
                                 (0.0208)        (0.0208)   
------------------------------------------------------------
N                    1743            1743            1743   
------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001
{{< /stata >}}

<div><br/></div></div><div><br/></div></span>
</div>
</div>
