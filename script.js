let startTime = 0;
let time = startTime * 60;
const countdownEL = document.getElementById('countdown');


function startTimer(){
    setInterval(updateTime, 1000);  //calls function every second
}

function updateTime(){
    const minutes = Math.floor(time / 60); //rounds down
    let seconds = time % 60;

    countdownEL.innerHTML = `${minutes}: ${seconds}`
    time--;
}


function changeMenuIcon(x){
    x.classList.toggle("change")
}