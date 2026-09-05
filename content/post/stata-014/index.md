---
title: 样条回归与阶跃回归 | Stata
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
  <li><div><span style="font-weight:700">劳伦斯·马希，戴维·科米尔，《样条回归模型》</span></div></li>
  <li><div>样条回归可以刻画两条回归线在连接点处平滑的斜率变化，并且避免回归线中间出现断裂。</div></li>
  <li><div><span style="font-weight:700">样条回归相比多项式回归的优势</span></div></li>
  <li><div>多项式回归可以用时间、时间的平方项、时间的立方项等作为自变量，然而这样很快会遇到完全多重共线性问题。</div></li>
  <li><div>多项式回归不够灵活，不足以捕捉到斜率的突然变化，尤其当变化周期不规律的时候。</div></li>
  <li><div><span style="font-weight:700">样条回归相比虚拟变量回归/阶跃式回归（piecewise regression）的优势</span></div></li>
  <li><div>样条回归是限制性的虚拟变量回归，样条变化处是连续而非断裂的。</div></li>
  <li><div><span style="background-color:#fffaa5;-evernote-highlight:true"><span style="background-color:#fffaa5;color:red;font-weight:700;-evernote-highlight:true">分离回归（sperate regression）</span></span></div></li>
  </ul>
  </div>
---

<div class="yinxiang-note">
<div>
<span><div><ul><li><div><span style="font-weight: bold;">劳伦斯·马希，戴维·科米尔，《样条回归模型》</span></div></li><ul><li><div>样条回归可以刻画两条回归线在连接点处平滑的斜率变化，并且避免回归线中间出现断裂。</div></li><li><div><span style="font-weight: bold;">样条回归相比多项式回归的优势</span></div></li><ul><li><div>多项式回归可以用时间、时间的平方项、时间的立方项等作为自变量，然而这样很快会遇到完全多重共线性问题。</div></li><li><div>多项式回归不够灵活，不足以捕捉到斜率的突然变化，尤其当变化周期不规律的时候。</div></li></ul><li><div><span style="font-weight: bold;">样条回归相比虚拟变量回归/阶跃式回归（piecewise regression）的优势</span></div></li><ul><li><div>样条回归是限制性的虚拟变量回归，样条变化处是连续而非断裂的。</div></li></ul></ul></ul><div><br/></div><ul><li><div><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">分离回归（sperate regression）</span></span></div></li></ul>

{{< stata >}}
use "E:\Data Storages\Dataset for Learning\talk.dta",clear
*14岁以前
eststo m1:reg talk age if age < 14
*14岁及以后
eststo m2:reg talk age if age >= 14

esttab m1 m2,nogap se

--------------------------------------------
                      (1)             (2)   
                     talk            talk   
--------------------------------------------
age                 0.682           3.629***
                  (0.382)         (0.301)   
_cons               8.075*         -24.97***
                  (3.981)         (5.709)   
--------------------------------------------
N                      62             138   
--------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001

gen age1 = (age - 14)
gen age2 = (age - 14)
replace age1 = 0 if age >= 14
replace age2 = 0 if age < 14
gen age_dummy1 = age < 14
gen age_dummy2 = age >= 14
eststo m3: reg talk age1 age2 age_dummy1 age_dummy2,hascons
esttab m1 m2 m3,nogap se
predict yhat

------------------------------------------------------------
                      (1)             (2)             (3)   
                     talk            talk            talk   
------------------------------------------------------------
age                 0.682           3.629***                
                  (0.382)         (0.301)                   
age1                                                0.682   
                                                  (0.438)   
age2                                                3.629***
                                                  (0.287)   
age_dummy1                                          17.62***
                                                  (2.009)   
age_dummy2                                          25.83***
                                                  (1.547)   
_cons               8.075*         -24.97***            0   
                  (3.981)         (5.709)             (.)   
------------------------------------------------------------
N                      62             138             200   
------------------------------------------------------------
Standard errors in parentheses
* p<0.05, ** p<0.01, *** p<0.001

twoway (scatter talk age) ///
       (line yhat age if age <14, sort) ///
       (line yhat age if age >=14, sort), ///
       xline(14)
{{< /stata >}}

<div><img data-filename="Graph.png" src="%E6%A0%B7%E6%9D%A1%E5%9B%9E%E5%BD%92%E4%B8%8E%E9%98%B6%E8%B7%83%E5%9B%9E%E5%BD%92%20%20Stata_files/Graph.png" type="image/png"/></div><ul><li><div>当14岁的时候，<span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">在打电话的时间上有一个显著“跳跃”，即8.2分钟。</span></div></li></ul>

{{< stata >}}
lincom age_dummy2-age_dummy1
------------------------------------------------------------------------------
        talk |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
         (1) |    8.20972   2.535655     3.24   0.001     3.209051    13.21039
------------------------------------------------------------------------------
{{< /stata >}}

<ul><li><div>当14岁的时候，<span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">在打电话的斜率上有一个显著“跳跃”，即</span><span style="background-color: rgb(255, 250, 165);-evernote-highlight:true;"><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">2.94</span></span><span style="background-color: rgb(255, 250, 165); color: rgb(255, 0, 0); font-weight: bold;-evernote-highlight:true;">分钟/岁。</span></div></li></ul>

{{< stata >}}
lincom age2 - age1
------------------------------------------------------------------------------
        talk |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
         (1) |   2.946947   .5233158     5.63   0.000     1.914895       3.979
------------------------------------------------------------------------------
{{< /stata >}}

<ul><li><div><span style="font-weight: bold; background-color: rgb(255, 250, 165);-evernote-highlight:true;"><font color="#FF0000">这显然是与现实不吻合</font></span></div></li></ul><div><br/></div><ul><li><div><span style="font-weight: bold;">样条回归</span></div></li><ul><li><div>样条回归使用特定的分段函数（或样条函数）对数据进行拟合，但相邻两段函数之间是连续的，即满足整体连续的条件。</div></li><li><div>样条函数的次数、节点个数和节点位置的选择需要根据经验确定，当观察值较多时，可以根据<b><font style="color: rgb(255, 0, 0); background-color: rgb(255, 250, 165);-evernote-highlight:true;">最小化残差平方和原则来选择节点数和节点位置</font></b>。</div></li></ul><li><div><span style="font-weight: bold;">mkspline</span></div></li></ul><div><a href="https://www3.nd.edu/~rwilliam/stats3/Margins03.pdf" style="font-weight: bold;">https://www3.nd.edu/~rwilliam/stats3/Margins03.pdf</a></div>

{{< stata >}}
mkspline yage1 14 yage2 = age, marginal
tablist age yage1 yage2, sort(v)
regress talk yage1 yage2 age_dummy2

------------------------------------------------------------------------------
        talk |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
       yage1 |   .6820981   .4377618     1.56   0.121    -.1812301    1.545426
       yage2 |   2.946947   .5233158     5.63   0.000     1.914895       3.979
  age_dummy2 |    8.20972   2.535655     3.24   0.001     3.209051    13.21039
       _cons |   8.074878     4.5636     1.77   0.078    -.9251856    17.07494
------------------------------------------------------------------------------

regress talk yage1 yage2

------------------------------------------------------------------------------
        talk |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]
-------------+----------------------------------------------------------------
       yage1 |   1.629302   .3333956     4.89   0.000     .9718194    2.286784
       yage2 |   2.500347   .5168166     4.84   0.000     1.481144     3.51955
       _cons |  -.0316085    3.90619    -0.01   0.994    -7.734924    7.671707
------------------------------------------------------------------------------

predict yhat2
twoway (scatter talk age) ///
       (line yhat2 age if age <14, sort) ///
       (line yhat2 age if age >=14, sort), ///
       xline(14)
{{< /stata >}}

</div><div><img data-filename="Graph.png" src="%E6%A0%B7%E6%9D%A1%E5%9B%9E%E5%BD%92%E4%B8%8E%E9%98%B6%E8%B7%83%E5%9B%9E%E5%BD%92%20%20Stata_files/Graph%20%5B1%5D.png" type="image/png"/></div><div><br/></div></span>
</div>
</div>
