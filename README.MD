# SWPU绩点计算

## 简介

本脚本可以在[西南石油大学教务系统](https://jwxt.swpu.edu.cn)的“综合查询-全部成绩”以及“本学期成绩”页面显示各个学期的平均学分绩点

最新版本：v1.2.12

更新内容：

> 1.增加本学期成绩页面的绩点计算，本学期的绩点计算更加精确
>
> 2.在本学期成绩页面中，**（跳过）**标识也表示暂时没有出成绩的科目

## 使用方法

### 脚本安装

**请先安装脚本管理器后，再安装本脚本**

脚本管理器推荐使用**Tampermonkey**（油猴），可以在各大浏览器的插件商店里搜到

也可以直接点击下面对应浏览器的链接进入商店页面安装

<a class='button is-primary is-light is-responsive' href='https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd'>Edge</a> <a class='button is-primary is-light is-responsive' href='https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo'>Chrome</a> <a class='button is-primary is-light is-responsive' href='https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/'>Firefox</a>

下面是Tampermonkey的主页

<a class='button is-primary is-light is-responsive' href='https://www.tampermonkey.net/'>Tampermonkey主页</a>

安装完脚本管理器后，点击下面的链接安装本脚本

<a class='button is-primary is-light is-responsive' href='https://greasyfork.org/scripts/456105-swpu%E7%BB%A9%E7%82%B9%E8%AE%A1%E7%AE%97/code/SWPU%E7%BB%A9%E7%82%B9%E8%AE%A1%E7%AE%97.user.js'>SWPU绩点计算</a>

### 脚本使用

进入教务系统后点击顶栏的“综合查询”后等待片刻就可以查看各个学期的平均学分绩点了

在“综合查询-全部成绩”查看各学期的平均学分绩点时，如果学期内有挂科或者补考按照正常计算会算进绩点内，但在这个页面计算的是没有的

所以如果同学在本学期有挂科或补考，请点击侧边栏的“本学期成绩”查看绩点，其他学期绩点请咨询辅导员或使用作者开发的桌面软件[SWPU学分绩点计算器](https://merept.github.io/gpac)进行计算

## 脚本下载

SWPU学分绩点

版本 v1.2.12

更新内容：

> 1.增加本学期成绩页面的绩点计算，本学期的绩点计算更加精确
>
> 2.在本学期成绩页面中，**（跳过）**标识也表示暂时没有出成绩的科目

<a class='button is-primary is-light is-responsive' href='https://greasyfork.org/scripts/456105-swpu%E7%BB%A9%E7%82%B9%E8%AE%A1%E7%AE%97/code/SWPU%E7%BB%A9%E7%82%B9%E8%AE%A1%E7%AE%97.user.js'>立即安装</a>

## 注意

加粗并打上“※”号的课程名的课程是已经计算进去的

> **高等数学(Ⅰ-1) ※**

有“（跳过）”注释的证明是英语四六级、选修课或者暂时没有出成绩的科目，不计算在内

（若要计算选修课，请在脚本内将最上面的`skipElectives`变量的值改为`false`）

> 全国英语四级 (跳过)

什么标记都没有并且字体没有加粗的是没有计算进去，刷新网页即可。

> 高等数学(Ⅰ-1)

## 结果可能有出入，仅供参考

也可以使用作者开发的桌面软件[SWPU学分绩点计算器](https://merept.github.io/gpac)进行计算，本软件计算结果会更加精确
