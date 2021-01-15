const poBtn = document.querySelector("#po-btn");
const sbBtn = document.querySelector("#sb-btn");
const lbBtn = document.querySelector("#lb-btn");

poBtn.addEventListener("click", toggleSession);
sbBtn.addEventListener("click", toggleSession);
lbBtn.addEventListener("click", toggleSession);

function toggleSession(e) {
    console.log(e.target);
    if(e.target === poBtn){
        e.target.classList.add("chosen-session");
        sbBtn.classList.remove("chosen-session");
        lbBtn.classList.remove("chosen-session");
    } else if(e.target === sbBtn){
        e.target.classList.add("chosen-session");
        poBtn.classList.remove("chosen-session");
        lbBtn.classList.remove("chosen-session");
    } else if(e.target === lbBtn){
        e.target.classList.add("chosen-session");
        poBtn.classList.remove("chosen-session");
        sbBtn.classList.remove("chosen-session");
    }
}