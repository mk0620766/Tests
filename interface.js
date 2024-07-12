function showGetUserDataFace(button) {
    button.onclick = () => {
        document.body.innerHTML = `
        <section class="alertSection">
            <div class="alert">
                <span>
                    لا تنسى كتابة اسمك وان تختار مدى صعوبة الإختبار
                </span>
                <button type="button" onclick="document.querySelector('.alertSection').style.display='none'">حسنا</button>
            </div>
        </section>
        <section class="WelcomeMass">
        <h3>للمتابعة يرجى كتابة اسمك وتحديد مدى صعوبة الإختبار</h3>
        <div class="userName">
            <input type="text" dir="auto" id="userName" placeholder="اكتب إسمك " maxlength="20">
            <label for="userName">الإسم</label>
        </div>
        <p class="title">:ما صعوبة الإختبار</p>
        <article class="chooses">
            <div class="easy" data-value="EasyQuestion" data-condition="مبتدئ" onclick="ExamLevals(this)">سهل و بسيط</div>
            <div class="center" data-value="CenterQuestion" data-condition="متوسط" onclick="ExamLevals(this)">متوسط ومتوازن</div>
            <div class="hard" data-value="HardQuestion" data-condition="محترف" onclick="ExamLevals(this)">صعب و عميق</div>
        </article>
        <div class="btn">
            <button type="button" id="UserNameBtn" type='button' onclick='showExam(this)'>ابدأ الإختبار</button>
        </div>
        </section>
        `;
        document.querySelector(".WelcomeMass").style.animationName='WelcomeMass_Secound_Height'
    }
};
let ExamLevel;
function showExam(button) {
    let userName = document.querySelector(".userName input");
    button.onclick = () => {
        if (userName.value != '' && ExamLevel!=null) {
            window.localStorage.setItem("userName", userName.value);
            window.location.reload();
        }
        else {
            document.querySelector(".alertSection").style.display = 'flex';
        }
    }
}
function ExamLevals(div) {
    document.querySelectorAll(".chooses div").forEach((div2) => {
        div2.classList.remove("ActiveChoose")
    })
    div.classList.add("ActiveChoose");
    ExamLevel = div.getAttribute("data-value");
    ExamCondition = div.getAttribute("data-condition");
    window.localStorage.setItem("ExamLevel", ExamLevel);
    window.localStorage.setItem("ExamCondition", ExamCondition);
}