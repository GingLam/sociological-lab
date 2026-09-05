---
title: HAPC模型的SAS与Stata转换
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
  <li><div>线性模型</div></li>
  <li><div>Stata</div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">use https://stats.idre.ucla.edu/stat/stata/examples/mlm_ma_hox/pupcross, clear
  </span></span><span class="line"><span class="cl">xtmixed achiev pupsex pupses  || _all: R.sschool ||_all: R.pschool, reml var
  </span></span></code></pre></td></tr></table></div></div>
  <ul>
  <li><div>SAS</div></li>
  </ul>
  <div class="highlight"><div class="chroma"><table class="lntable"><tr><td class="lntd"><pre class="chroma" tabindex="0"><code><span class="lnt">1
  </span><span class="lnt">2
  </span><span class="lnt">3
  </span><span class="lnt">4
  </span><span class="lnt">5
  </span><span class="lnt">6
  </span></code></pre></td><td class="lntd"><pre class="chroma" tabindex="0"><code class="language-stata" data-lang="stata"><span class="line"><span class="cl">
  </span></span><span class="line"><span class="cl">proc mixed data=WORK.IMPORT covtest CL;
  </span></span><span class="line"><span class="cl">      class sschool pschool;
  </span></span><span class="line"><span class="cl">      model achiev = pupsex pupses/solution CL;
  </span></span><span class="line"><span class="cl">      random sschool pschool / solution;
  </span></span><span class="line"><span class="cl">run;
  </span></span></code></pre></td></tr></table></div></div>
  </div>
---

<div class="yinxiang-note">
<div><span><ul><li><div>线性模型</div></li><ul><li><div>Stata</div></li></ul></ul>

{{< stata >}}
use https://stats.idre.ucla.edu/stat/stata/examples/mlm_ma_hox/pupcross, clear
xtmixed achiev pupsex pupses  || _all: R.sschool ||_all: R.pschool, reml var
{{< /stata >}}

<ul><ul><li><div>SAS</div></li></ul></ul>

{{< stata >}}
proc mixed data=WORK.IMPORT covtest CL;
      class sschool pschool;
      model achiev = pupsex pupses/solution CL;
      random sschool pschool / solution;
run;
{{< /stata >}}

<ul><li><div>非线性模型</div></li><ul><li><div>Stata</div></li><li><div>xtmelogit是旧命令</div></li></ul></ul>

{{< stata >}}
recode achiev (min/5.9 = 0)(6/max = 1),gen(ach)
xtmelogit ach pupsex pupses  || _all: R.sschool || _all: R.pschool, var
*等价于
meglm ach pupsex pupses || _all: R.sschool || _all: R.pschool, family(binomial) link(logit)
{{< /stata >}}

<ul><li><div><b style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><font color="#ff2600">Demidenko (2004: 374–375, 408)，F检验</font></b></div></li></ul>

{{< stata >}}
meglm ach pupsex pupses , family(binomial) link(logit)

                                                Wald chi2(2)      =      17.24
Log likelihood = -626.12645                     Prob > chi2       =     0.0002
------------------------------------------------------------------------------
         ach | Coefficient  Std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
      pupsex |      0.338      0.137     2.47   0.013        0.070       0.606
      pupses |      0.170      0.048     3.54   0.000        0.076       0.264
       _cons |     -0.140      0.218    -0.65   0.519       -0.567       0.286
------------------------------------------------------------------------------

meglm ach pupsex pupses i.sschool || _all: R.pschool, family(binomial) link(logit)

Log likelihood = -536.82395                     Prob > chi2       =     0.0000
------------------------------------------------------------------------------
         ach | Coefficient  Std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
      pupsex |      0.457      0.164     2.78   0.005        0.134       0.779
      pupses |      0.212      0.058     3.68   0.000        0.099       0.325
             |


dis ((626.12645-536.82395)*2/30)/((536.82395*2)/(1000-32))

2.2397328

*Ftail(df1,df2,f-value)
gen p = Ftail(30,968,5.3676704)
sum p

    Variable |        Obs        Mean    Std. dev.       Min        Max
-------------+---------------------------------------------------------
           p |      1,000    4.32e-18           0   4.32e-18   4.32e-18
{{< /stata >}}

<div><br/></div><div><br/></div><div><br/></div>

{{< stata >}}
meqrlogit ach pupsex pupses  || _all: R.sschool || _all: R.pschool, var technique(nr)
{{< /stata >}}

<div><br/></div>

{{< stata >}}
meqrlogit be_poverty1 c_age c_age2 gender birth_p edu2 edu3 fam2 fam3 fam4 ihs_tincome_h_cpi || _all: R.cohort1 ||_all: R.wave, var technique(nr)
{{< /stata >}}

<div><br/></div>

{{< stata >}}
meglm ach pupsex pupses || _all: R.sschool || _all: R.pschool, family(binomial) link(probit)
{{< /stata >}}

<div><br/></div>

{{< stata >}}
melogit ach pupsex pupses  || _all: R.sschool ||_all: R.pschool
{{< /stata >}}

<ul><ul><li><div>R</div></li></ul></ul>

{{< stata >}}
#https://www.rensvandeschoot.com/tutorials/lme4/
library(lme4)
library(haven)
https://osf.io/7xnzp/
school <- read_dta("/Users/ginglam/Downloads/临时/sample.dta",encoding = "GB2312”)
school2 <- read_dta("/Users/ginglam/Downloads/临时/sample2.dta",encoding = "GB2312")
model<- lmer(achiev ~ 1 + pupsex + pupses + (1|sschool) + (1|pschool), REML = TRUE, data=school)
model2 <- glmer(ach ~ 1 + pupsex + pupses + (1|sschool) + (1|pschool), family=binomial, data=school2)
{{< /stata >}}

<ul><ul><li><div>SAS</div></li></ul></ul>

{{< stata >}}
PROC GLIMMIX DATA=WORK.IMPORT maxopt=25000;
      class sschool pschool;
      model ach(event='1') = pupsex pupses /solution CL
      dist=binary;
      random sschool pschool / solution;
      covtest GLM / WALD;
      NLOPTIONS TECHNIQUE=NRRIDG;
run;
{{< /stata >}}

<div><br/></div></span>
</div>
</div>
