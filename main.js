let GlobalJsItems;
// IS user passed the exam
let isPass;
window.onload = () => {
    if (window.localStorage.getItem("userName")) {
        if (localStorage.getItem("isPass")) {
            isPass=localStorage.getItem("isPass");
        }
        else {
            isPass = false;
        }
        if (isPass=='true') {
        document.body.innerHTML = `
            <section class="WantToRelaodExam">
                <article class="content">
                    <h3>لقد انهيت هذا الإختبار يا ${window.localStorage.getItem("userName")} هل تريد <a href="" onclick='localStorage.setItem("isPass",false);location.reload();'>إعادة الإختبار </a></h3>
                    <br>
                    : او
                    <br>
                    <div>
                        <span>
                            <select id="ChangeExamWithUserAgainInAlert">
                                <option value="EasyQuestion">بسيطة</option>
                                <option value="CenterQuestion">متوسطة</option>
                                <option value="HardQuestion">عميقة</option>
                            </select>
                            <small style="font-size: small;">"اختر من هذه القائمة"</small>
                        </span>
                        تجربة إختبار آخر ذو صعوبة
                    </div>
                </article>
            </section>`;
            let ChangeExamWithUserAgainInAlert = document.querySelector("#ChangeExamWithUserAgainInAlert");
            ChangeExamWithUserAgainInAlert.value = window.localStorage.getItem("ExamLevel");
            // ChangeExamLevelWithUserInAlert("لقد انهيت هذا الإختبار هل تريدإعادته")
            ChangeExamWithUserAgainInAlert.onchange = () => {
                let HTMLsection = document.createElement("section");
                HTMLsection.className = 'changeExamLevelAgainReadyFace';
                HTMLsection.innerHTML = `
                <div>
                    😤 هل انت مستعد
                    <span>
                        <button type="button" onclick="CloseMassage2(this)" id='CloseMassage'>اغلق هذه الرسالة</button>
                        <button type="button" id='StartExamWithAnotherChangeWithUser'>نعم . إبدأ الإختبار</button>
                    </span> 
                </div>`;
                document.body.append(HTMLsection);
                document.querySelector("#CloseMassage").setAttribute("data-select",ChangeExamWithUserAgainInAlert.id)
                HTMLsection.style.display = 'flex';
                // insert Select ID in close Massge button data-select to reset select value
                document.querySelector("#StartExamWithAnotherChangeWithUser").onclick = () => {
                    window.localStorage.setItem("ExamLevel", ChangeExamWithUserAgainInAlert.value);
                    window.localStorage.setItem("isPass",false);
                    if (window.localStorage.getItem("ExamLevel") == 'EasyQuestion') {
                        window.localStorage.setItem("ExamCondition","مبتدئ");
                    }
                    else if (window.localStorage.getItem("ExamLevel") == 'CenterQuestion') {
                        window.localStorage.setItem("ExamCondition","متوسط"); 
                    }
                    else {
                        window.localStorage.setItem("ExamCondition","محترف");
                    }
                    window.location.reload();
                }
            }
        }
        else {
            document.body.classList.add("Body_BG_img_class")
        // write Exams containar
        document.body.innerHTML = `
        <section class="waitWindow">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h3>... جاري تهيئة الإختبار</h3>
            </section>`;
        // startingFunctions
        let Exams;
let i = 0;
let jsitemsLength = 0;
let myrequest = new XMLHttpRequest();
// Get Exam Level
myrequest.open("Get",`${window.localStorage.getItem("ExamLevel")}.json`);
myrequest.send();
myrequest.onreadystatechange = function(){
    if (this.status === 200 && this.readyState === 4) {
        let MainHTML = document.createElement("main");
        let HeaderHTML = document.createElement("header");
        HeaderHTML.innerHTML = `
        <section class="UserLevelHeader">
            <span>${window.localStorage.getItem("ExamCondition")}</span><span>: نوع المستوى</span>
        </section>
        <section class="HelloWithUserName">
            <span>${window.localStorage.getItem("userName")}</span><span>: مرحبا يا</span>
        </section>
        <section class="logo">
            <span>Tests</span><span><img src="ExamIcon.png" width='40'></span>
        </section>
        <section class="changeExamLevelAgain">
            <label for="changeExamLevelAgain">
            مدى صعوبة الإختبار
               <select id="changeExamLevelAgain">
                    <option value="EasyQuestion">بسيط</option>
                    <option value="CenterQuestion">متوسط</option>
                    <option value="HardQuestion">عميق</option>
                </select>
            </label>
        </section>
        `;
        let HTMLsection = document.createElement("section");
        HTMLsection.className = 'changeExamLevelAgainReadyFace';
        HTMLsection.innerHTML = `
        <div>
            😤 هل انت مستعد
            <span>
                <button type="button" onclick="CloseMassage(this)" id='CloseMassage'>اغلق هذه الرسالة</button>
                <button type="button" id='StartExamWithAnotherChangeWithUser'>نعم . إبدأ الإختبار</button>
            </span> 
        </div>`;
        document.body.append(HTMLsection);
        document.body.append(HeaderHTML);
        // add dynamic height to header[section which change ExamLevel]
        document.querySelector(".changeExamLevelAgain").style.top =
        window.getComputedStyle(HeaderHTML).getPropertyValue("height");
        MainHTML.innerHTML=`<section class='ExamsBig'><section class='Exams'></section><div class="LevelLine"></div></section>`
        document.body.append(MainHTML);
        Exams = document.querySelector(".Exams");
        let jsitems = JSON.parse(myrequest.responseText); 
        GlobalJsItems = jsitems;
        jsitemsLength = jsitems.length;
        // Get level line
        for (let b = 0; b < jsitemsLength; b++){
           document.querySelector(".LevelLine").innerHTML += `<span></span>`;  
        }
        QuestionsInnerHtml(jsitems);
        setTimeout(() => {
            document.querySelector(".waitWindow").remove();
        }, 1000)
            // change Exam Level With user
        let ExamLevelWinReload;
        let select = document.querySelector("#changeExamLevelAgain");
        select.value = window.localStorage.getItem("ExamLevel");
        let changeExamLevelAgainReadyFace=document.querySelector(".changeExamLevelAgainReadyFace")
        select.onchange = () => {
            changeExamLevelAgainReadyFace.style.display = 'flex';
            ExamLevelWinReload = select.value;
            // insert Select ID in close Massge button data-select to reset select value
            document.querySelector("#CloseMassage").setAttribute("data-select",select.id)
        }
        changeExamLevelAgainReadyFace.querySelector("#StartExamWithAnotherChangeWithUser").onclick = () => {
            window.localStorage.setItem("ExamLevel", ExamLevelWinReload);
            if (window.localStorage.getItem("ExamLevel") == 'EasyQuestion') {
                window.localStorage.setItem("ExamCondition","مبتدئ");
            }
            else if (window.localStorage.getItem("ExamLevel") == 'CenterQuestion') {
                window.localStorage.setItem("ExamCondition","متوسط"); 
            }
            else {
                window.localStorage.setItem("ExamCondition","محترف");
            }
            window.location.reload();
        }
    }
}
function QuestionsInnerHtml(jsitems) {
    setTimeout(() => {
        if (i < jsitemsLength) { 
        // 
        Exams.innerHTML = `
        <article class="Exam${i} Exam" data-option="FiRadQe">
            <h2 class="question">${jsitems[i]["question"]}</h2>
            <div class="answers">
            
            </div>
            <div class="btn">
                <button type="button" id='NextQuestion'>السؤال التالي</button>
                <button type="button" id='PreviousQuestion'>السؤال السابق</button>
            </div>
        </article>`;
            if (i + 1 == jsitemsLength) {
            document.querySelector(".btn #NextQuestion").innerHTML = 'إنهاء الإختبار';
        
        }
        if (jsitems[i]["optionsCount"]=="4") {
            document.querySelector(".answers").innerHTML = `
               <div class="option1">
                    <input type="radio" name="1" class="FiRadQe one option11" id="rad1">
                    <label id="one" for="rad1">${jsitems[i]["option1"]}</label>
               </div>
               <div class="option2">
                    <input type="radio" name="1" class="FiRadQe two option12" id="rad2">
                    <label id="two" for="rad2">${jsitems[i]["option2"]}</label>
               </div>
                <div class="option3">
                    <input type="radio" name="1" class="FiRadQe three option13" id="rad3">
                    <label id="three" for="rad3">${jsitems[i]["option3"]}</label>
                </div>
                <div class="option4">
                   <input type="radio" name="1" class="FiRadQe four option14" id="rad4">
                   <label id="four" for="rad4">${jsitems[i]["option4"]}</label>
                </div>`
        } else {
            document.querySelector(".answers").innerHTML = `
                <div class="options3_1">
                    <input type="radio" name="1" class="FiRadQe one option11" id="rad1">
                    <label id="one" for="rad1">${jsitems[i]["option1"]}</label>
                </div>
                <div class="options3_2">
                    <input type="radio" name="1" class="FiRadQe two option12" id="rad2">
                    <label id="two" for="rad2">${jsitems[i]["option2"]}</label>
                </div>
                <div class="options3_3">
                    <input type="radio" name="1" class="FiRadQe three option13" id="rad3">
                    <label id="three" for="rad3">${jsitems[i]["option3"]}</label>
                </div>`;
            // add gap between Exam divs options
        }
        document.querySelector(`.Exam`).style.animationName = 'Come';
        let optionsClass = document.querySelector(`.Exam${i}`).getAttribute("data-option");
        let options = document.querySelectorAll(`.${optionsClass}`);
        options.forEach((option) => {
            option.onclick = function () {
                jsitems[i]["userAnswer"] = document.querySelector(`#${option.classList[1]}`).innerHTML;;
                jsitems[i]["optionClicked"] = this.classList[2];
            }
        });
        if(jsitems[i]["optionClicked"] !=''){
            document.querySelector(`.${jsitems[i]["optionClicked"]}`).checked = 'true';
        }
        let spS = document.querySelectorAll(".LevelLine span")
        spS[i].style.background = 'gray';    
        spS[i].style.scale = '1.1';
        spS[i].style.border = 'gray 3px solid';    
        document.querySelector(".btn #NextQuestion").onclick = function () {
            if (jsitemsLength == i + 1) {
                localStorage.setItem("isPass", true);
                isPass = localStorage.setItem("isPass", true);
                if (jsitems[i]["userAnswer"] != "") {
                  // Make result
                  add = 100 / jsitemsLength;
                    rightAnswers = 0;
                    rightanswersNumber = 0;
                    wronganswersNumber = 0;
                for (let a = 0; a < jsitemsLength; a++){
                    if (jsitems[a]["answer"] == jsitems[a]["userAnswer"]) {
                        rightAnswers = rightAnswers + add;
                        rightanswersNumber = rightanswersNumber + 1;
                    }
                    else {
                        wronganswersNumber = wronganswersNumber + 1;
                    }
                    }
                    document.querySelector(".changeExamLevelAgain").remove();
                    document.querySelector(`.ExamsBig`).innerHTML = `
                            <article class="loading">
                                <div class="loadingItem"></div>
                                <h3>... جاري التصحيح</h3>
                            </article>`;
                    setTimeout(() => {
                        document.querySelector(".loading").style.animationName='OpacityTo0'
                    },4300)
            // export result
            setTimeout(() => {
               document.querySelector("main").innerHTML = `
                    <section class="resultsShow">
                    <article class="content">
                        <section class='congratoilationContent'>
                            <h2 class="congratoilation" dir='auto'>نهانينا يا ${window.localStorage.getItem("userName")} على اتمام الإختبار</h2>
                        </section>
                        <section class='resultContent'>
                            <h5 class="congratoilation" dir='auto'>لقد حصلت على  <span class="persent">0%</span></h5>
                            <atricle class='resultDataShow'>
                                <canvas id='DrawResultCircles' width='125' height='125'></canvas>
                                <section class='dataText'>
                                    <div class='rightAnswers'><span id='rightAnswersNumber'><ul></ul></span> عدد الاجابات الصحيحة</div>
                                    <div class='wrongAnswers'><span id='wrongAnswersNumber'><ul></ul></span> عدد الاجابات الخاطئة</div>
                                </section>
                            </atricle>
                        </section>
                        <section class='showReslut_QuestAns'>
                            <button class="showResultBtn" onclick="showResultsAnswers()">التأكد من الأسئلة</button>
                        </section>
                    </article>
                    </section>`;
                // inner exam result in circle slices
                let canvas = document.querySelector("#DrawResultCircles"),
                    ctx = canvas.getContext("2d");
                ctx.beginPath();
                ctx.fillStyle = 'rgb(0, 175, 0)';
                ctx.moveTo(canvas.height/2,canvas.width/2)
                ctx.arc(canvas.height/2,canvas.width/2, 60, 0, 360);
                ctx.fill();
                // secound circle
                ctx.beginPath();
                ctx.fillStyle = 'rgb(175, 0, 0)';
                ctx.moveTo(canvas.height/2,canvas.width/2)
                ctx.arc(canvas.height/2,canvas.width/2, 60,0,((100-rightAnswers)*3.6)*(Math.PI/180));
                ctx.closePath();
                ctx.fill();
                // finsh exam result in circle slices
                countUp = 0;
                rightanswerUp = 0;
                wronganswerUp = 0;
                rightAnswers=Math.round(rightAnswers)
                setInterval(() => {
                    if (countUp < rightAnswers) {  
                        countUp = countUp + 1;
                        document.querySelector(".persent").innerHTML =countUp + "%";
                        
                    }
                }, 50)
                // inner right /wrong answer as text with an animation
                for (let a = 0; a < rightanswersNumber+1; a++){
                    document.querySelector("#rightAnswersNumber ul").innerHTML += `<li>${a}</li>`;  
                }
                for (let a = 0; a < wronganswersNumber+1; a++){
                    document.querySelector("#wrongAnswersNumber ul").innerHTML += `<li>${a}</li>`;  
                }
                setInterval(() => {
                    if (countUp == rightAnswers &&rightanswerUp<=rightanswersNumber) {  
                        rightanswerUp = rightanswerUp + 1;
                        document.querySelector("#rightAnswersNumber ul").style.bottom =
                            (rightanswerUp * 20)-20+ "px";
                        }
                }, 300)
                isOPN = false;
                setInterval(() => {
                        if (countUp == rightAnswers &&rightanswerUp>=rightanswersNumber &&wronganswerUp<=wronganswersNumber) {  
                            wronganswerUp = wronganswerUp + 1;
                            document.querySelector("#wrongAnswersNumber ul").style.bottom =
                            (wronganswerUp * 20)-20+ "px";
                    }
                    if (countUp == rightAnswers && rightanswerUp >= rightanswersNumber && wronganswerUp >= wronganswersNumber&&isOPN==false) {
                        document.querySelector(".resultsShow .showResultBtn").style.pointerEvents = 'all';
                        document.querySelector(".resultsShow .showResultBtn").style.cursor = 'pointer';
                        isOPN = true;
                    }
                }, 300)
                // finsh inner right /wrong answer as text with an animation
            },5000)   
        }
        }        
            if (jsitems[i]["userAnswer"] != "") {
                if (i + 1 != jsitemsLength) {
                    document.querySelector(`.Exam`).style.animationName = 'Leave';
                }
            i = i + 1;
           QuestionsInnerHtml(jsitems);
        }
            spS[i-1].style.background = 'black';
            spS[i-1].innerHTML = '*';
            spS[i-1].style.border = 'black 1px solid';
            } 
        document.querySelector(".btn #PreviousQuestion").onclick = function () {
        if (i != 0) {
            document.querySelector(`.Exam`).style.animationName = 'Come';
            i = i - 1;
            QuestionsInnerHtml(jsitems);
            spS[i].style.background = 'black';
            spS[i].style.border = 'black 1px solid';
            spS[i+1].style.background = 'white';
            spS[i + 1].style.scale = '1';
            spS[i + 1].style.border = 'none';
            setTimeout(() => {
                spS[i].innerHTML = '';
                document.querySelector(`.${jsitems[i]["optionClicked"]}`).checked = 'true';
            },500)
        }
        }     
        // add bg color
        }
    },500)
};
        }
    }
    else {
        document.body.style.background = 'linear-gradient(to right,#22719b,#ff00ea)';
        document.body.innerHTML = `
        <section class="WelcomeMass">
        <div class="hello" dir="auto">
            <h2>مرحبا بك في</h2><img src="ExamIcon.png" alt="">
        </div>
        <div class="notes" dir="auto">
            <h1>منصة Tests</h1>
            <p>اختبارات عامة في مجالات شتى وأسئلة كثيرة متنوعة مفيدة حسب نوع الصعوبة 
             الذي يحدد بواسطتك انت ماذا تنتظر  <b>اختبر معلوماتك الآن .</b></p>
        </div>
        <div class="btn">
            <button id="startGetUserData" onclick="showGetUserDataFace(this)">إبدأ الإختبار</button>
        </div>
        </section>
        `;
    }
}
// Close Massage("هل انت مستعد ") to change Exam
function CloseMassage(button) {
    document.querySelector('.changeExamLevelAgainReadyFace').style.display = 'none';
    let HTMLSelect=document.querySelector(`#${button.getAttribute("data-select")}`)
    HTMLSelect.value = window.localStorage.getItem("ExamLevel");
    
}
function CloseMassage2(button) {
    document.querySelector('.changeExamLevelAgainReadyFace').remove()
    let HTMLSelect=document.querySelector(`#${button.getAttribute("data-select")}`)
    HTMLSelect.value = window.localStorage.getItem("ExamLevel");
    
}
// get json Item index
let index = 0;
function showResultsAnswers() {
    document.querySelector("main").innerHTML = `
            <section class="results">
        <div class="content">
            <div class="right back" onclick="back(document.querySelector('.result${index}'))">< </div>
            <article class="resultscontent">
                <atricle class="result result${index}"></atricle>
            </article>
            <div class="left fore" onclick="fore(document.querySelector('.result${index}'))">></div>
        </div>
        <div class="message">
            <h3>لقد انتهى الإختبار هل تريد إعادته او عرض النتيجة مرة أخرى</h3>
            <div class='btns'>
                <button type="reset" id="reloadExam" onclick="reloadExam();">إعادة الإختبار</button>
                <button type="button" id="showResultAgain" onclick="showResultAgain()">عرض النتيجة</button>
            </div>
        </div>
    </section>`;
    ShowUserAnswerResultItems(document.querySelector(`.result${index}`));
}
function ShowUserAnswerResultItems(resultContainar) {
        resultContainar.innerHTML = `
            <section class='QuestionNameHeader'><div><span class='QuestionNameHeaderCount'>0</span>/${GlobalJsItems.length}</span></div><span class="questionName">${GlobalJsItems[index]["questionName"]}</span></section>
            <h2 class="question">${GlobalJsItems[index]["question"]}</h2>
            <div class="options"></div>`;
            // inner count in header
            document.querySelector(".QuestionNameHeaderCount").innerHTML = index+1;
        if (GlobalJsItems[index]["optionsCount"] == 3) {
            document.querySelector(".options").innerHTML = `
                <div class="option11"><span>${GlobalJsItems[index]["option1"]}</span></div>
                <div class="option12"><span>${GlobalJsItems[index]["option2"]}</span></div>
                <div class="option13"><span>${GlobalJsItems[index]["option3"]}</span></div>`;
            document.querySelectorAll(".options div").forEach((div) => {
                div.style.width = '28%';
            })
        }
        else {
            document.querySelector(".options").innerHTML = `
                <div class="option11"><span>${GlobalJsItems[index]["option1"]}</span></div>
                <div class="option12"><span>${GlobalJsItems[index]["option2"]}</span></div>
                <div class="option13"><span>${GlobalJsItems[index]["option3"]}</span></div>
                <div class="option14"><span>${GlobalJsItems[index]["option4"]}</span></div>`
        }
        if (GlobalJsItems[index]["answer"] == GlobalJsItems[index]["userAnswer"]) {
            document.querySelector(`.options .${GlobalJsItems[index]["optionClicked"]}`).classList.add("rightResult");
        }
        else {
            document.querySelector(`.options .${GlobalJsItems[index]["optionClicked"]}`).classList.add("wrongResult");
            document.querySelector(`.options .${GlobalJsItems[index]["rightAnswerClass"]}`).classList.add("rightResult");
        }
}

index = 0;
function back(containar) {
    if (index < GlobalJsItems.length) {
        if (index != GlobalJsItems.length - 1) {
            index = index + 1;
        }
        ShowUserAnswerResultItems(containar);
    }
    if(index == GlobalJsItems.length-1) {
        document.querySelector(".results .message").style.animationName = 'Remember';
        setTimeout(() => {
        document.querySelector(".results .message").style.animationName = '';
        },1000)
        
    }
};
function fore(containar) {
    if (index > 0) {
        index = index - 1;
        ShowUserAnswerResultItems(containar);
    }
    if(index==0) {
        document.querySelector(".results .message").style.animationName = 'Remember';
        setTimeout(() => {
        document.querySelector(".results .message").style.animationName = '';
        },1000)
    }
};
function reloadExam() {
    localStorage.setItem("isPass",false);
    location.reload();
};
function showResultAgain() {
 document.querySelector("main").innerHTML = `
    <section class="resultsShow">
    <article class="content">
        <section class='congratoilationContent'>
            <h2 class="congratoilation" dir='auto'>نتيحتك يا ${window.localStorage.getItem("userName")}</h2>
        </section>
        <section class='resultContent'>
            <h5 class="congratoilation" dir='auto'>الدرجة<span class="persent">0%</span></h5>
            <atricle class='resultDataShow'>
            <canvas id='DrawResultCircles' width='125' height='125'></canvas>
            <section class='dataText'>
                <div class='rightAnswers'><span id='rightAnswersNumber'><ul></ul></span> عدد الاجابات الصحيحة</div>
                <div class='wrongAnswers'><span id='wrongAnswersNumber'><ul></ul></span> عدد الاجابات الخاطئة</div>
            </section>
            </atricle>
        </section>
        <section class='showReslut_QuestAns'>
            <button class="showResultBtn" onclick="showResultsAnswers()">التأكد من الأسئلة</button>
        </section>
    </article>
    </section>`;
    document.querySelector(".showResultBtn").style.pointerEvents = 'all';
    document.querySelector(".showResultBtn").style.cursor = 'pointer';
    // inner exam result in circle slices
let canvas = document.querySelector("#DrawResultCircles"),
    ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle = 'rgb(0, 175, 0)';
ctx.moveTo(canvas.height/2,canvas.width/2)
ctx.arc(canvas.height/2,canvas.width/2, 60, 0, 360);
ctx.fill();
// secound circle
ctx.beginPath();
ctx.fillStyle = 'rgb(175, 0, 0)';
ctx.moveTo(canvas.height/2,canvas.width/2)
ctx.arc(canvas.height/2,canvas.width/2, 60,0,((100-rightAnswers)*3.6)*(Math.PI/180));
ctx.closePath();
ctx.fill();
// finsh exam result in circle slices
document.querySelector(".persent").innerHTML = Math.round(rightAnswers) + "%";
// inner right /wrong answer as text with no animation
document.querySelector("#rightAnswersNumber ul").innerHTML = `<li>${rightanswersNumber}</li>`;  
document.querySelector("#wrongAnswersNumber ul").innerHTML = `<li>${wronganswersNumber}</li>`;  
document.querySelector("#wrongAnswersNumber ul").style.bottom = '0px';
document.querySelector("#rightAnswersNumber ul").style.bottom = '0px';
// finsh inner right /wrong answer as text with no animation
}