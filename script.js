const pageTitle = document.querySelector("title");
const poBtn = document.querySelector("#po-btn");
const sbBtn = document.querySelector("#sb-btn");
const lbBtn = document.querySelector("#lb-btn");
const clocks = document.querySelectorAll(".clock");
const setTime = document.querySelector(".set-time");
const inputFields = document.querySelectorAll(".set-time div input");
const playBtn = document.querySelector("#play-btn");
const pauseBtn = document.querySelector("#pause-btn");
const resetBtn = document.querySelector("#reset-btn");

const ringTone = new Audio("sounds/digital-alarm-clock.mp3");
let chosenClock = clocks[0];
let chosenIndex = [...clocks].indexOf(chosenClock);
let countDownInterval;
let sessionMarker = false;

setTime.children[0].style.display = "block";
setTime.children[1].style.display = "none";
setTime.children[2].style.display = "none";

poBtn.addEventListener("click", toggleSession);
sbBtn.addEventListener("click", toggleSession);
lbBtn.addEventListener("click", toggleSession);

playBtn.addEventListener("click", resetStart);
pauseBtn.addEventListener("click", pauseCountDown);
resetBtn.addEventListener("click", resetCountDown);
inputFields[0].addEventListener("change", changeTime);
inputFields[1].addEventListener("change", changeTime);
inputFields[2].addEventListener("change", changeTime);


clocks[0].style.display = "flex";
clocks[1].style.display = "none";
clocks[2].style.display = "none";

clocks[0].children[0].innerHTML = `${inputFields[chosenIndex].value}`;
clocks[0].children[2].innerHTML = "00";

playBtn.style.display = "block";



function toggleSession(e) {
    if(e.target === poBtn){
        e.target.classList.add("chosen-session");
        sbBtn.classList.remove("chosen-session");
        lbBtn.classList.remove("chosen-session");
        setTime.children[0].style.display = "block";
        setTime.children[1].style.display = "none";
        setTime.children[2].style.display = "none";

        clocks[0].style.display = "flex";
        clocks[1].style.display = "none";
        clocks[2].style.display = "none";

        chosenClock = clocks[0];
        chosenIndex = [...clocks].indexOf(chosenClock);

        clocks[0].children[0].innerHTML = `${inputFields[chosenIndex].value}`;
        clocks[0].children[2].innerHTML = "00";

    } else if(e.target === sbBtn){
        e.target.classList.add("chosen-session");
        poBtn.classList.remove("chosen-session");
        lbBtn.classList.remove("chosen-session");
        setTime.children[0].style.display = "none";
        setTime.children[1].style.display = "block"
        setTime.children[2].style.display = "none";

        clocks[0].style.display = "none";
        clocks[1].style.display = "flex";
        clocks[2].style.display = "none";

        chosenClock = clocks[1];
        chosenIndex = [...clocks].indexOf(chosenClock);

        clocks[1].children[0].innerHTML = `${inputFields[chosenIndex].value}`;
        clocks[1].children[2].innerHTML = "00";

    } else if(e.target === lbBtn){
        e.target.classList.add("chosen-session");
        poBtn.classList.remove("chosen-session");
        sbBtn.classList.remove("chosen-session");
        setTime.children[0].style.display = "none";
        setTime.children[1].style.display = "none"
        setTime.children[2].style.display = "block"

        clocks[0].style.display = "none";
        clocks[1].style.display = "none";
        clocks[2].style.display = "flex";

        chosenClock = clocks[2];
        chosenIndex = [...clocks].indexOf(chosenClock);

        clocks[2].children[0].innerHTML = `${inputFields[chosenIndex].value}`;
        clocks[2].children[2].innerHTML = "00";

    }
}

function initCountDown() {
    toggleControlBtns();
    const sessionIndex = chosenIndex;
    sessionMinutes = parseInt(clocks[chosenIndex].children[0].textContent);
    sessionSeconds = parseInt(clocks[chosenIndex].children[2].textContent);
    const startTime = new Date();
    const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes() + sessionMinutes, startTime.getSeconds() + sessionSeconds);

    
    let m;
    let s;
    
    if(endTime - startTime > 0) {
        countDownInterval = setInterval(countDown, 1000);
        if (sessionIndex === chosenIndex) {
            let timeDiff = endTime - startTime;
            m = Math.floor(timeDiff / 1000 / 60);
            s = Math.floor((timeDiff / 1000) % 60);

            m = m < 10? "0" + m : m;
            s = s < 10? "0" + s : s;

            clocks[chosenIndex].children[0].innerHTML = m;
            clocks[chosenIndex].children[2].innerHTML = s;
        }
    } else {
        toggleControlBtns();
    }

    
    

    function countDown() {
        const controlTime = new Date().getTime();

        let timeDiff = endTime - controlTime;
        m = Math.floor(timeDiff / 1000 / 60);
        s = Math.floor((timeDiff / 1000) % 60);
    
        if(m === 0 && s === 0) {
            console.log("Countdown finished!");
            clearInterval(countDownInterval);
            ringTone.play();
            toggleControlBtns();
        }
        if(m != 0 && s != 0) {
            sessionMarker = true;
        } else {
            sessionMarker = false;
        }

        m = m < 10? "0" + m : m;
        s = s < 10? "0" + s : s;
    
        if (sessionIndex === chosenIndex) {
            clocks[chosenIndex].children[0].innerHTML = m;
            clocks[chosenIndex].children[2].innerHTML = s;
        }

        pageTitle.innerHTML = `${m}:${s} Pomodoro Clock`
    }
}

function killCountDown() {
    clearInterval(countDownInterval);
}

function resetStart() {
    killCountDown();
    initCountDown();
    console.log("resetStart()");
}

function changeTime() {
    if(sessionMarker === false) {
        console.log(chosenIndex);
        clocks[chosenIndex].children[0].innerHTML = `${inputFields[chosenIndex].value}`
        clocks[chosenIndex].children[2].innerHTML = "00";
    } else {
        console.log(sessionMarker);
        return;
    }
}

function toggleControlBtns() {
    if(playBtn.style.display === "block") {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
        // resetBtn.style.display = "flex"

    } else {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
        // resetBtn.style.display = "none"
    }
}

function pauseCountDown() {
    clearInterval(countDownInterval);
    sessionMarker = false;
    toggleControlBtns() 
}

function resetCountDown() {
    console.log("resetCountDown");
    if(sessionMarker === false) {
        clocks[chosenIndex].children[0].innerHTML = `${inputFields[chosenIndex].value}`;
        clocks[chosenIndex].children[2].innerHTML = "00";
    }
}
