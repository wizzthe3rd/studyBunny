let startTime = 0;
let time = startTime * 60;
let targetTime = document.getElementById('time-modal-selector');
let selectedTime = 0;
const countdownEL = document.getElementById('countdown');



document.getElementById('play-button').addEventListener('click', showTimeModal);
document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
document.querySelector('.shop-icon').addEventListener('click', toggleShop)
document.querySelector('.shop-modal-close').addEventListener('click', toggleShop)


function startTimer(){
    setInterval(updateTime, 1000);  //calls function every second
}

function getTargetTime(){
    selectedTime = targetTime.value;
    console.log(selectedTime)
    countdownEL.innerHTML = parseInt(selectedTime);
    showTimeModal();
    updateTime();
}

function showTimeModal(){
    document.getElementById('time-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active')
}

function updateTime(){
    const minutes = Math.floor(time / 60); //rounds down
    let seconds = time % 60;

    countdownEL.innerHTML = `${minutes}: ${seconds}`;
    time--;
}

function toggleShop(){
    document.querySelector('.shop-modal').classList.toggle('active')
    document.getElementById('overlay').classList.toggle('active')
}

function toggleMenu(){
    document.querySelector('.menu').classList.toggle('active')
    document.getElementById('overlay').classList.toggle('active')
}
function toggleModal(){
    document.getElementById('time-modal').classList.toggle('active')
    document.getElementById('overlay').classList.toggle('active')
}