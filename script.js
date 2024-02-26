let currency = 100;
document.getElementById('currency').innerHTML = currency;

document.getElementById('play-button').addEventListener('click', showTimeModal);
document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
document.querySelector('.shop-icon').addEventListener('click', toggleShop);
document.querySelector('.shop-modal-close').addEventListener('click', toggleShop);

document.querySelector('.currency-modal-close').addEventListener('click', function(){
    toggleCurrencyMessage();
    document.querySelector('.currency-modal').removeChild('currencyMessage');
})

document.querySelector('.time-modal-submit').addEventListener('click', function(){
    startTimer();
    showTimeModal();
});


function startTimer(){
    document.querySelector('.countdown-background').classList.toggle('active')
    let minutes = parseInt(document.getElementById('min-input').value);
    let seconds = parseInt(document.getElementById('sec-input').value);

    //input field is 0 is nothing has been entered
    if (isNaN(minutes)) {
        minutes = 0;
      }
    
      if (isNaN(seconds)) {
        seconds = 0;
      }
    
    let totalTime = (minutes * 60) + seconds; //total time in seconds
    // setInterval(updateTime, 1000);  //calls function every second
    let currencyTime = totalTime;
     let timer = setInterval(function() {
        let minutes = Math.floor(totalTime / 60);   //minutes left, math.floor rounds down to the nearest whole number
        let seconds = totalTime % 60;

        //checks if min/sec are less than 0 if they are, 0+min/sec else just display min/sec
        let displayMin = (minutes < 10) ? "0" + minutes : minutes;
        let displaySec = (seconds < 10) ? "0" + seconds : seconds;

        document.getElementById('countdown').innerHTML = displayMin + ':' + displaySec;
        if (totalTime <= 0){
            let amountEarned = Math.floor(currencyTime / 2)
            currency+= amountEarned;
            document.getElementById('currency').innerHTML = currency;
            let modalContainer = document.querySelector('.currency-modal');
            let modalElement = document.createElement("currencyMessage");
            if (amountEarned > 0){
                toggleCurrencyMessage();
                modalElement.innerHTML += `<h3>Well done! You earned <span>${amountEarned}</span> carrots!</h3>`;
                modalContainer.appendChild(modalElement);
            }

            clearInterval(timer); //stops timer setInterval
            document.getElementById('countdown').innerHTML = "00:00"
            document.querySelector('.countdown-background').classList.toggle('active')
        } else{
            //decrements time every second
            totalTime--;
        }


     }, 1000)   //occurs every second
    
}


function showTimeModal(){
    document.getElementById('time-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function toggleShop(){
    document.querySelector('.shop-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function toggleMenu(){
    document.querySelector('.menu').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}
function toggleModal(){
    document.getElementById('time-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function toggleCurrencyMessage(){
    document.querySelector('.currency-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}