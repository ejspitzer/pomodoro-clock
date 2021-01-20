const poBtn = document.querySelector("#po-btn");
const sbBtn = document.querySelector("#sb-btn");
const lbBtn = document.querySelector("#lb-btn");
const timeDisplay = document.querySelectorAll(".time");
const setTime = document.querySelector(".set-time");
const inputField = document.querySelector(".set-time div input");
const controlBtns = document.querySelectorAll(".control-btn");

setTime.children[0].style.display = "block";
setTime.children[1].style.display = "none";
setTime.children[2].style.display = "none";

poBtn.addEventListener("click", toggleSession);
sbBtn.addEventListener("click", toggleSession);
lbBtn.addEventListener("click", toggleSession);

function toggleSession(e) {
    if(e.target === poBtn){
        e.target.classList.add("chosen-session");
        sbBtn.classList.remove("chosen-session");
        lbBtn.classList.remove("chosen-session");
        setTime.children[0].style.display = "block";
        setTime.children[1].style.display = "none"
        setTime.children[2].style.display = "none"
        inputField.value = 25;
    } else if(e.target === sbBtn){
        e.target.classList.add("chosen-session");
        poBtn.classList.remove("chosen-session");
        lbBtn.classList.remove("chosen-session");
        setTime.children[0].style.display = "none";
        setTime.children[1].style.display = "block"
        setTime.children[2].style.display = "none"
        inputField.value = 5;
    } else if(e.target === lbBtn){
        e.target.classList.add("chosen-session");
        poBtn.classList.remove("chosen-session");
        sbBtn.classList.remove("chosen-session");
        setTime.children[0].style.display = "none";
        setTime.children[1].style.display = "none"
        setTime.children[2].style.display = "block"
        inputField.value = 15;
    }
}





const sessionTime = parseInt(inputField.value);
const startTime = new Date();
const endTime = new Date().setMinutes(startTime.getMinutes() + sessionTime);
let startTimeDiff = endTime - startTime.getTime();

const countDownInterval = setInterval(countDown, 1000);

function countDown() {
    const controlTime = new Date().getTime();

    let timeDiff = endTime - controlTime;
    let m = Math.floor(timeDiff / 1000 / 60);
    let s = Math.floor((timeDiff / 1000) % 60);

    if(m === 0 && s === 0) {
        console.log("Countdown finished!");
        clearInterval(countDownInterval);
    }
        
    m = m < 10? "0" + m : m;
    s = s < 10? "0" + s : s;


    timeDisplay[0].innerHTML = m;
    timeDisplay[2].innerHTML = s;
    console.log(`${m}:${s}`);

}
