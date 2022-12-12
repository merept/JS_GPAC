// ==UserScript==
// @name         SWPU绩点计算
// @namespace    http://merept.github.io/
// @version      1.2.6
// @license      MIT
// @description  在jwxt.swpu.edu.cn的“综合查询-全部成绩”以及“本学期成绩”页面显示各个学期的平均学分绩点，加粗并打上“※”号的课程是计算进去的，有“（跳过）”注释的证明是英语四六级、选修课或暂时未出成绩的课程，不计算在内（若要计算选修课，请把源代码最上面的skipElectives变量的值改为false），什么标记都没有的可能是没有计算进去，刷新网页即可。（结果可能有出入，仅供参考）
// @author       MerePT
// @match        http://jwxt.swpu.edu.cn/loginAction.do
// @icon         https://pic.imgdb.cn/item/6388c62816f2c2beb1c0909d.png
// @grant        unsafeWindow
// ==/UserScript==
var skipElectives = true; //true: 不计算选修课，false: 计算选修课，默认不计算选修课

var totalPoints = [];
var totalScores = [];

function isEnglishTest(name) {
    return new RegExp("英语实践+").test(name)
            || new RegExp("全国英语+").test(name);
}

function isElectives(course) {
    return skipElectives && course.substring(0, 2) == '00';
}

function isEffectiveScore(str) {
    return !str || new RegExp("^[\s　]*$").test(str);
}

function isNotCount(name, course, score) {
    return isEnglishTest(name) || isElectives(course) || isEffectiveScore(score);
}

function calGp(obj, ps, sPlace) {
    for (let o of obj) {
        let datas = o.querySelectorAll('td');
        if (isNotCount(datas[2].innerText, datas[0].innerText, datas[sPlace].innerText)) {
            datas[2].innerText += ' (跳过)';
            continue;
        }

        // console.log(datas[2].innerText + ' - 学分：' + datas[4].innerText + ' - 成绩：' + datas[sPlace].children[0].innerText);

        let p = Number(datas[4].innerText);
        ps.tp += p

        let score = Number(datas[sPlace].innerText);
        let gradePoint = 0;
        if (score >= 60) {
            gradePoint = (score - 60) / 10 + 1;
        }
        ps.ts += gradePoint * p;

        datas[2].innerText += ' ※';
        datas[2].style = "font-weight:bolder";
    }
    return ps;
}

function calGpa(frame, sPlace) {
    let ps = {
        tp: 0,
        ts: 0
    };
    let scores = frame.document.querySelectorAll('.titleTop2');

    for (let s of scores) {
        let even = s.querySelectorAll('.even');
        ps = calGp(even, ps, sPlace);

        let ef = s.querySelectorAll('.evenfocus');
        ps = calGp(ef, ps, sPlace);

        let odd = s.querySelectorAll('.odd');
        ps = calGp(odd, ps, sPlace);

        totalPoints.push(ps.tp);
        totalScores.push(ps.ts);

        ps.tp = 0;
        ps.ts = 0;
    }

    // console.log('totalPoints:' + totalPoints);
    // console.log('totalScores:' + totalScores);
}


function main() {
    setInterval(function() {
        if (document.querySelector("frame[name='bottomFrame']").contentWindow.document.querySelector("#mainF").contentWindow.document.querySelector("iframe[name='lnqbIfra']") != null) {
            if (document.querySelector("frame[name='bottomFrame']").contentWindow.document.querySelector("#mainF").contentWindow.document.querySelector("iframe[name='lnqbIfra']").contentWindow == undefined) {
                return;
            }

            let mainF = document.querySelector("frame[name='bottomFrame']").contentWindow
                        .document.querySelector("#mainF").contentWindow;
            let scoreF = mainF.document.querySelector("iframe[name='lnqbIfra']").contentWindow;

            if (scoreF.document.body != null && scoreF.document.body.getAttribute('is-calculated') == undefined && scoreF.document.querySelectorAll('.title').length != 0) {
                // clearInterval(timer);
                scoreF.document.body.setAttribute("is-calculated", "true");

                setTimeout(function() {
                    calGpa(scoreF, 6);

                    let titles = scoreF.document.querySelectorAll('.title');
                    let pa = scoreF.document.querySelectorAll('.pageAlign');
                    let headTitle = mainF.document.querySelector('#tblHead');
                    let slide = mainF.document.querySelector('.table_k')
                                                .querySelectorAll('table')[7]
                                                .querySelectorAll('a');
                    let whole = {
                        points: 0,
                        scores: 0
                    };

                    for (let i = 0; i < titles.length; i++) {
                        // console.log(titles[i]);
                        let b = document.createElement('b');
                        let gpa = (totalScores[i] / totalPoints[i]).toFixed(2);

                        b.innerText = '\xa0本学期平均学分绩点: ' + gpa;
                        titles[i].getElementsByTagName('td')[2].appendChild(b);

                        pa[i].querySelectorAll('table')[1]
                            .querySelector('td').innerText += '\xa0\xa0平均学分绩点:\xa0\xa0' + gpa;

                        slide[i].innerText += slide[i].getAttribute('is-add')==undefined ? ("\xa0\xa0GPA: " + gpa) : '';
                        slide[i].setAttribute('is-add', 'true');

                        whole.points += totalPoints[i];
                        whole.scores += totalScores[i];
                    }

                    let s = "\xa0\xa0GPA: " + (whole.scores / whole.points).toFixed(2);
                    headTitle.querySelectorAll('td')[2]
                                .querySelector('b').innerText += headTitle.getAttribute('is-add')==undefined ? s : '';
                    headTitle.setAttribute('is-add', 'true');

                    totalPoints = [];
                    totalScores = [];
                }, 1500);
            }
        }
    },30);

    setInterval(function() {
        if (document.querySelector("frame[name='bottomFrame']").contentWindow
                .document.querySelector("#mainF").contentWindow != undefined) 
        {
            let mainF = document.querySelector("frame[name='bottomFrame']").contentWindow
                        .document.querySelector("#mainF").contentWindow;
            let titles = mainF.document.querySelectorAll('.title');

            if (mainF.document.body != null && mainF.document.body.getAttribute('is-calculated') == undefined && titles.length != 0 && titles[0].getElementsByTagName('td')[2].innerText.trim() == '本学期成绩查询列表') {
                // clearInterval(timer);
                mainF.document.body.setAttribute("is-calculated", "true");

                setTimeout(function() {
                    calGpa(mainF, 9);

                    let title = mainF.document.querySelector('.title');

                    // console.log(titles[i]);
                    let b = document.createElement('b');
                    b.innerText = '\xa0平均学分绩点: ' + (totalScores[i] / totalPoints[i]).toFixed(2);
                    title.getElementsByTagName('td')[2].appendChild(b);

                    totalPoints = [];
                    totalScores = [];
                }, 1500);
            }
        }
    },30);
}

(function() {
    let isLoaded = false
    let timer = setInterval(function() {
        if (document.querySelector("frame[name='bottomFrame']").contentWindow
                .document.querySelector("#mainF").contentWindow
                .document.querySelectorAll("title")[0].innerText === '成绩查询') {
            isLoaded = true;
            clearInterval(timer);
            main();
        }
    },30);
})();